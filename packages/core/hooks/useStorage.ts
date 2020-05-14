import { useEffect, useState } from 'react'
import { LABEL } from '../constants'

const PREFIX = 'cockpit'

const load = <T>(storage: Storage, key: string, defaultValue: T): T => {
  const value = storage.getItem(`${PREFIX}/${key}`)

  if (value !== null) {
    try {
      return JSON.parse(value)
    } catch (err) {
      console.error(`${LABEL} JSON parse error: ${key} is ${value}`)
      return defaultValue
    }
  }
  return defaultValue
}
const store = <T>(storage: Storage, key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value)

  storage.setItem(`${PREFIX}/${key}`, stringifiedValue)
}

/**
 * Returns a stateful value, and a function to update it.
 * When the value is updated, it is store to the storage.
 */
export const useStorage = <T>(key: string, defaultValue: T) => {
  const [value, set] = useState(() => load(localStorage, key, defaultValue))

  useEffect(() => {
    store(localStorage, key, value)
  }, [key, value])

  useEffect(() => {
    set(load(localStorage, key, defaultValue))
  }, [key, defaultValue])

  return [value, set] as const
}
