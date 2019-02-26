import { useContext } from 'react'
import { ClientContext } from '../contexts'

export function useUserTags() {
  const { useUserTagsCache } = useContext(ClientContext)
  const { read, reload: retry } = useUserTagsCache('')

  return { read, retry }
}
