import { LRUMap } from 'lru_map'

function identityHashFn(input: any) {
  return input
}

export interface Resource<I, V> {
  read(input: I): Promise<V>
  remove(input: I): void
}

export function createResource<I, K extends string | number, V>(
  fetch: (input: I) => Promise<V>,
  hashInput: (input: I) => K = identityHashFn,
  limit: number = 10
): Resource<I, V> {
  const cache = new LRUMap<K, Promise<V>>(limit)

  function read(input: I) {
    const key = hashInput(input)
    if (cache.has(key)) {
      return cache.get(key)!
    }

    const promise = fetch(input)

    cache.set(key, promise)
    return promise
  }
  function remove(input: I) {
    const key = hashInput(input)

    cache.delete(key)
  }

  return { read, remove }
}
