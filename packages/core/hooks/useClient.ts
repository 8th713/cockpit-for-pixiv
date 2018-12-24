import { createContext, useContext, useRef, useEffect } from 'react'
import { createClient } from '../externals/client'
import { pixivGlobalData } from '../externals/pixivGlobalData'

const Context = createContext(createClient(pixivGlobalData))

/**
 * Returns Client an AbortController. If component unmount, returned AbortController will run abort.
 */
export function useClient() {
  const client = useContext(Context)
  const ac = useAbort()

  return { client, ac }
}

useClient.Context = Context

/**
 * Returns an AbortController. If component unmount, returned AbortController will run abort.
 */
export function useAbort() {
  const ref = useRef(new AbortController())

  useEffect(() => () => ref.current.abort(), [])
  return ref.current
}
