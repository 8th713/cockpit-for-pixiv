import { useContext } from 'react'
import { ClientContext } from '../contexts'

export function usePages(illustId: string) {
  const { usePageCache } = useContext(ClientContext)
  const { read, remove: retry } = usePageCache(illustId)

  return { read, retry }
}
