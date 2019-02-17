import { useContext } from 'react'
import { ClientContext } from '../contexts'

export function useBookmarkForm(illustId: string) {
  const { useBookmarkCache } = useContext(ClientContext)
  const { read, remove: retry } = useBookmarkCache(illustId)

  return { read, retry }
}
