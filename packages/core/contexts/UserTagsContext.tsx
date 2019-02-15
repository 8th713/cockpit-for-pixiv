import { useSort, useUserTags as useUserTagsInternal } from '../hooks'
import { createProvider } from './utlis'

export const UserTagsProvider = createProvider(function useUserTags() {
  const userTags = useUserTagsInternal()
  const sort = useSort()

  return { ...userTags, ...sort }
}, 'UserTagsProvider')
