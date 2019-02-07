import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'

const PREFIX = 'cockpit'

const Context = createContext<Storage>(localStorage)

/**
 * Returns a stateful value, and a function to update it.
 * When the value is updated, it is store to the storage.
 */
export function useStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const storage = useContext(Context)
  const load = useCallback((): T => {
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
  }, [storage])
  const store = useCallback(
    (value: T) => {
      const stringifiedValue = JSON.stringify(value)

      storage.setItem(`${PREFIX}/${key}`, stringifiedValue)
    },
    [storage]
  )
  const [value, set] = useState(load)

  useEffect(() => store(value), [value])

  return [value, set]
}

useStorage.Context = Context
