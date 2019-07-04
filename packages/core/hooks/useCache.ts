import { LRUMap } from 'lru_map'
import { useEffect, useMemo } from 'react'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'
import { useForceUpdate } from './useForceUpdate'

const Pending = 0
const Resolved = 1
const Rejected = 2

type PendingResult = {
  status: typeof Pending
  value: Promise<unknown>
}

type ResolvedResult<V> = {
  status: typeof Resolved
  value: V
}

type RejectedResult = {
  status: typeof Rejected
  value: unknown
}

type Result<V> = PendingResult | ResolvedResult<V> | RejectedResult

type Cache<I, V> = {
  forceUpdate: () => void
  preload: (input: I) => void
  read: (input: I) => V
  reload: (input: I) => void
  remove: (input: I) => void
  replace: (input: I, value: V) => void
}

type CacheHook<I, V> = {
  (): Cache<I, V>
  readonly cache: LRUMap<I, Result<V>>
}

const accessResult = <I, V>(
  cache: LRUMap<I, Result<V>>,
  fetch: (input: I) => Promise<V>,
  input: I
): Result<V> => {
  let entry = cache.get(input)
  if (entry === undefined) {
    const thenable = fetch(input)
    thenable.then(
      value => {
        if (newResult.status === Pending) {
          const resolvedResult: ResolvedResult<V> = newResult as any
          resolvedResult.status = Resolved
          resolvedResult.value = value
        }
      },
      error => {
        if (newResult.status === Pending) {
          const rejectedResult: RejectedResult = newResult as any
          rejectedResult.status = Rejected
          rejectedResult.value = error
        }
      }
    )
    const newResult: PendingResult = {
      status: Pending,
      value: thenable
    }
    cache.set(input, newResult)
    return newResult
  } else {
    return entry
  }
}

export function createCache<I extends string | number, V>(
  fetch: (input: I) => Promise<V>,
  cache: LRUMap<I, Result<V>>
): CacheHook<I, V> {
  const updaters = new Map<() => void, Set<I>>()
  const subscribe = (input: I, update: () => void) => {
    const inputs = updaters.get(update)
    if (inputs) {
      inputs.add(input)
    } else {
      updaters.set(update, new Set([input]))
    }
  }
  const unsubscribe = (update: () => void) => {
    updaters.delete(update)
  }
  const emit = (input: I) => {
    batchedUpdates(() => {
      for (const [update, inputs] of updaters) {
        if (inputs.has(input)) update()
      }
    })
  }

  function useCache(): Cache<I, V> {
    const forceUpdate = useForceUpdate()
    const value = useMemo(() => {
      const preload = (input: I) => {
        accessResult(cache, fetch, input)
      }
      const read = (input: I) => {
        const result = accessResult(cache, fetch, input)
        subscribe(input, forceUpdate)

        switch (result.status) {
          case Pending: {
            throw result.value
          }
          case Resolved: {
            return result.value
          }
          case Rejected: {
            throw result.value
          }
        }
      }
      const reload = (input: I) => {
        cache.delete(input)
        const result = accessResult(cache, fetch, input)
        if (result.status === Pending) {
          result.value.finally(() => emit(input))
        }
      }
      const remove = (input: I) => {
        cache.delete(input)
        emit(input)
      }
      const replace = (input: I, value: V) => {
        const result: ResolvedResult<V> = {
          status: Resolved,
          value
        }
        cache.set(input, result)
        emit(input)
      }

      return { forceUpdate, preload, read, reload, remove, replace }
    }, [forceUpdate])

    useEffect(() => () => unsubscribe(forceUpdate), [forceUpdate])

    return value
  }

  useCache.cache = cache
  return useCache
}
