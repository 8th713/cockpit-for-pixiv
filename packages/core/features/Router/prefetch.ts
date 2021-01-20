import { prefetchAuthor } from '../Info/Author/authorQuery'
import { prefetchRecentIllusts } from '../Info/RecentIllustList/recentIllustsQuery'
import { prefetchIllust } from '../Info/illustQuery'
import { prefetchPages } from '../Preview/pagesQuery'
import { useQueryClient } from 'react-query'
import { useCallback } from 'react'

export const usePrefetch = () => {
  const client = useQueryClient()

  return useCallback(
    async (id: string) => {
      prefetchPages(client, id)

      const illust = await prefetchIllust(client, id)

      prefetchAuthor(client, illust.userId)
      prefetchRecentIllusts(client, illust.userId)
    },
    [client]
  )
}
