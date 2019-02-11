import {
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'
import { StorageContext } from '../contexts'

const PREFIX = 'cockpit'

/**
 * Returns a stateful value, and a function to update it.
 * When the value is updated, it is store to the storage.
 */
export function useStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const storage = useContext(StorageContext)
  const [value, set] = useState(() => load(storage, key, defaultValue))

  useEffect(() => {
    store(storage, key, value)
  }, [value])
  useEffect(() => {
    set(load(storage, key, defaultValue))
  }, [key, storage])

  return [value, set]
}

function load<T>(storage: Storage, key: string, defaultValue: T): T {
  const value = storage.getItem(`${PREFIX}/${key}`)

  if (value !== null) {
    try {
      return JSON.parse(value)
    } catch (err) {
      console.error(err)
      return defaultValue
    }
  }
  return defaultValue
}
function store<T>(storage: Storage, key: string, value: T) {
  const stringifiedValue = JSON.stringify(value)

  storage.setItem(`${PREFIX}/${key}`, stringifiedValue)
}
