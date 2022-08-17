import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { prefetchAuthor } from '../Author/authorQuery'
import { preFetchInfo } from '../Info/infoQuery'
import { prefetchImages } from '../Preview/imagesQuery'
import { prefetchRecentWorks } from '../RecentWorks/recentWorksQuery'

export function usePrefetch() {
  const client = useQueryClient()

  return useCallback(
    async (id: string) => {
      const images = await prefetchImages(client, id)
      const illust = await preFetchInfo(client, id)

      const [author, recentWorks] = await Promise.all([
        prefetchAuthor(client, illust.userId),
        prefetchRecentWorks(client, illust.userId),
      ])
      return { images, illust, author, recentWorks }
    },
    [client]
  )
}
