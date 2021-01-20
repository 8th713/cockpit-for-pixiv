import {
  QueryClient,
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { bookmarkBy, fetchIllust, likeBy } from '../../externals/fetch'

export type IllustQueryResult = QueryObserverResult<Pixiv.Illust>

const QUERY_KEY = 'ILLUST'

export const prefetchIllust = (client: QueryClient, id: string) =>
  client.fetchQuery([QUERY_KEY, id], () => fetchIllust(id))

export const useIllustQuery = (id: string) =>
  useQuery([QUERY_KEY, id], () => fetchIllust(id), { keepPreviousData: true })

export const useLikeMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(() => likeBy(id), {
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEY, id])

      const snapshot = queryClient.getQueryData<Pixiv.Illust>([QUERY_KEY, id])!

      if (snapshot.likeData) return snapshot

      queryClient.setQueryData<Pixiv.Illust>([QUERY_KEY, id], {
        ...snapshot,
        likeCount: snapshot.likeCount + 1,
        likeData: true,
      })

      return snapshot
    },
    onSettled: (data, error, variables, snapshot) => {
      if (error) {
        console.log(error)
        queryClient.setQueryData([QUERY_KEY, id], snapshot)
      }
      queryClient.invalidateQueries([QUERY_KEY, id])
    },
  })
}

export const useBookmarkMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    (variables: Pixiv.BookmarkPost) => bookmarkBy(id, variables),
    {
      onMutate: async (variables) => {
        await queryClient.cancelQueries([QUERY_KEY, id])

        const snapshot = queryClient.getQueryData<Pixiv.Illust>([
          QUERY_KEY,
          id,
        ])!

        if (snapshot.bookmarkData) return snapshot

        queryClient.setQueryData<Pixiv.Illust>([QUERY_KEY, id], {
          ...snapshot,
          bookmarkCount: snapshot.bookmarkCount + 1,
          bookmarkData: { id: '', private: variables.restrict || false },
        })

        return snapshot
      },
      onSettled: (data, error, variables, snapshot) => {
        if (error) {
          console.log(error)
          queryClient.setQueryData([QUERY_KEY, id], snapshot)
        }
        queryClient.invalidateQueries([QUERY_KEY, id])
      },
    }
  )
}
