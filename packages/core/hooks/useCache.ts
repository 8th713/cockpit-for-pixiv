import { LRUMap } from 'lru_map'
import { useForceUpdate } from './useForceUpdate'
import { useAbort } from './useAbort'

enum Status {
  Pending,
  Resolved,
  Rejected
}

type PendingResult = {
  status: Status.Pending
  value: Promise<unknown>
}

type ResolvedResult<V> = {
  status: Status.Resolved
  value: V
}

type RejectedResult = {
  status: Status.Rejected
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
        if (newResult.status === Status.Pending) {
          const resolvedResult: ResolvedResult<V> = newResult as any
          resolvedResult.status = Status.Resolved
          resolvedResult.value = value
        }
      },
      error => {
        if (newResult.status === Status.Pending) {
          const rejectedResult: RejectedResult = newResult as any
          rejectedResult.status = Status.Rejected
          rejectedResult.value = error
        }
      }
    )
    const newResult: PendingResult = {
      status: Status.Pending,
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
    const { abortable } = useAbort()

    function read(): V {
      const result = accessResult(cache, fetch, input)

      switch (result.status) {
        case Status.Pending: {
          const suspender = result.value
          throw suspender
        }
        case Status.Resolved: {
          const value = result.value
          return value
        }
        case Status.Rejected: {
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
        status: Status.Resolved,
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
