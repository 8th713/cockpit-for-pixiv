import { LRUMap } from 'lru_map'
import { useForceUpdate } from './useForceUpdate'
import { useRef, useLayoutEffect } from 'react'

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

export type Result<V> = PendingResult | ResolvedResult<V> | RejectedResult

const PENDING = 0
const RESOLVED = 1
const REJECTED = 2

function setResolved<I, V>(cache: LRUMap<I, Result<V>>, input: I, value: V) {
  const result = cache.get(input)

  if (result) {
    const newResult: ResolvedResult<V> = result as any

    newResult.status = RESOLVED
    newResult.value = value
    return newResult
  } else {
    const newResult: ResolvedResult<V> = {
      status: RESOLVED,
      value
    }

    cache.set(input, newResult)
    return newResult
  }
}

function setRejected<I, V>(cache: LRUMap<I, Result<V>>, input: I, error: any) {
  const result = cache.get(input)

  if (result) {
    const newResult: RejectedResult = result as any

    newResult.status = REJECTED
    newResult.value = error
    return newResult
  } else {
    const newResult: RejectedResult = {
      status: REJECTED,
      value: error
    }

    cache.set(input, newResult)
    return newResult
  }
}

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
  cache: LRUMap<I, Result<V>>,
  forceFetch = false
) {
  return function useCache(input: I) {
    const unmounted = useRef(true)
    const forceUpdate = useForceUpdate()

    function read() {
      const result = accessResult(cache, fetch, input)

      switch (result.status) {
        case PENDING: {
          throw result.value
        }
        case RESOLVED: {
          if (forceFetch) {
            cache.delete(input)
          }
          return result.value
        }
        case REJECTED: {
          if (forceFetch) {
            cache.delete(input)
          }

          throw result.value
        }
      }
    }
    function remove() {
      cache.delete(input)
      if (unmounted.current) return
      forceUpdate()
    }
    function replace(value: V) {
      setResolved(cache, input, value)
      if (unmounted.current) return
      forceUpdate()
    }
    function reload(rollback?: V) {
      fetch(input).then(replace, error => {
        if (rollback) {
          replace(rollback)
        } else {
          setRejected(cache, input, error)
          if (unmounted.current) return
          forceUpdate()
        }
      })
    }

    useLayoutEffect(() => {
      unmounted.current = false
      return () => {
        unmounted.current = true
      }
    }, [])

    return { read, remove, replace, reload }
  }
}
