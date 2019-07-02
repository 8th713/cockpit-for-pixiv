import { LRUMap } from 'lru_map'
import { useEffect, useRef } from 'react'
import { useForceUpdate } from './useForceUpdate'

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

export function createCache<I extends string | number, V>(
  fetch: (input: I) => Promise<V>,
  cache: LRUMap<I, Result<V>>
) {
  let disabled = false
  return function useCache(input: I) {
    const inputRef = useRef<I | null>(null)
    const forceUpdate = useForceUpdate()

    useEffect(() => {
      inputRef.current = input
      return () => {
        inputRef.current = null
      }
    }, [input])

    /**
     * Read data from cache.
     * Throw promises if there is no data in cache
     */
    function read() {
      const result = accessResult(cache, fetch, input)

      switch (result.status) {
        case PENDING: {
          throw result.value
        }
        case RESOLVED: {
          return result.value
        }
        case REJECTED: {
          throw result.value
        }
      }
    }
    /**
     * Force update after delete data from cache.
     */
    function remove() {
      cache.delete(input)

      if (input !== inputRef.current) return

      forceUpdate()
    }
    /**
     * Force update after replace cache data.
     */
    function replace(value: V) {
      disabled = false
      setResolved(cache, input, value)

      if (input !== inputRef.current) return

      forceUpdate()
    }
    /**
     * Refetch data and update the cache.
     */
    function reload(alternative?: V) {
      if (disabled) return
      disabled = true
      fetch(input).then(replace, error => {
        if (alternative) {
          replace(alternative)
        } else {
          disabled = false
          setRejected(cache, input, error)
          if (input !== inputRef.current) return
          forceUpdate()
        }
      })
    }
    return { input, read, remove, replace, reload }
  }
}
