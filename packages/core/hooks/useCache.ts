import { LRUMap } from 'lru_map'
import { useForceUpdate } from './useForceUpdate'
import { useUnmountAbort } from './useUnmountAbort'

const PENDING = 0
const RESOLVED = 1
const REJECTED = 2

type PendingResult = {
  status: typeof PENDING
  value: Promise<unknown>
}

type ResolvedResult<V> = {
  status: typeof RESOLVED
  value: V
}

type RejectedResult = {
  status: typeof REJECTED
  value: unknown
}

type Result<V> = PendingResult | ResolvedResult<V> | RejectedResult

function accessResult<I, V>(
  cache: LRUMap<I, Result<V>>,
  fetch: (input: I) => Promise<V>,
  input: I
): Result<V> {
  let entry = cache.get(input)
  if (entry === undefined) {
    const thenable = fetch(input)
    thenable.then(
      value => {
        if (newResult.status === PENDING) {
          const resolvedResult: ResolvedResult<V> = newResult as any
          resolvedResult.status = RESOLVED
          resolvedResult.value = value
        }
      },
      error => {
        if (newResult.status === PENDING) {
          const rejectedResult: RejectedResult = newResult as any
          rejectedResult.status = REJECTED
          rejectedResult.value = error
        }
      }
    )
    const newResult: PendingResult = {
      status: PENDING,
      value: thenable
    }
    cache.set(input, newResult)
    return newResult
  } else {
    return entry
  }
}

export function createCacheHook<I extends string | number, V>(
  fetch: (input: I) => Promise<V>,
  cache: LRUMap<I, Result<V>> = new LRUMap(10)
) {
  return function useCache(input: I) {
    const forceUpdate = useForceUpdate()
    const abortable = useUnmountAbort()

    function read(): V {
      const result = accessResult(cache, fetch, input)

      switch (result.status) {
        case PENDING: {
          const suspender = result.value
          throw suspender
        }
        case RESOLVED: {
          const value = result.value
          return value
        }
        case REJECTED: {
          const error = result.value
          throw error
        }
      }
    }
    function preload() {
      accessResult(cache, fetch, input)
    }
    function remove() {
      cache.delete(input)
      forceUpdate()
    }
    function replace(value: V) {
      const result: ResolvedResult<V> = {
        status: RESOLVED,
        value
      }
      cache.set(input, result)
      forceUpdate()
    }
    function reload() {
      abortable(fetch(input)).then(replace)
    }

    return { read, preload, remove, replace, reload, abortable }
  }
}
