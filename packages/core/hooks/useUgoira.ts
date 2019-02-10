import { useContext } from 'react'
import { ClientContext } from '../contexts'

export function useUgoira(illustId: string) {
  const { useUgoiraCache } = useContext(ClientContext)
  const { read, remove: retry } = useUgoiraCache(illustId)

  return { read, retry }
}
