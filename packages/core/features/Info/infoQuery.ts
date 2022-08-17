import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { bookmarkBy, fetchIllustInfo, likeBy } from '../../externals/fetch'

const QUERY_KEY = 'INFO'

export function preFetchInfo(client: QueryClient, illustId: string) {
  return client.fetchQuery([QUERY_KEY, illustId], () =>
    fetchIllustInfo(illustId)
  )
}

export function useStickyInfo(illustId: string) {
  const query = useQuery(
    [QUERY_KEY, illustId],
    () => fetchIllustInfo(illustId),
    {
      keepPreviousData: true,
      notifyOnChangeProps: 'tracked',
    }
  )

  return {
    info: query.data,
    isError: query.isError,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isPreviousData: query.isPreviousData,
    refetch: query.refetch,
  }
}

export function useLikeMutation(illustId: string) {
  const client = useQueryClient()

  return useMutation(() => likeBy(illustId), {
    onMutate: async () => {
      await client.cancelQueries([QUERY_KEY, illustId])

      const snapshot = client.getQueryData<Pixiv.IllustInfo>([
        QUERY_KEY,
        illustId,
      ])!

      if (snapshot.likeData) return snapshot

      client.setQueryData<Pixiv.IllustInfo>([QUERY_KEY, illustId], {
        ...snapshot,
        likeCount: snapshot.likeCount + 1,
        likeData: true,
      })

      return snapshot
    },
    onSettled: (data, error, variables, snapshot) => {
      if (error) {
        console.log(error)
        client.setQueryData([QUERY_KEY, illustId], snapshot)
      }
      client.invalidateQueries([QUERY_KEY, illustId])
    },
  })
}

export function useBookmarkMutation(illustId: string) {
  const client = useQueryClient()

  return useMutation(
    (variables: Pixiv.BookmarkPost) => bookmarkBy(illustId, variables),
    {
      onMutate: async (variables) => {
        await client.cancelQueries([QUERY_KEY, illustId])

        const snapshot = client.getQueryData<Pixiv.IllustInfo>([
          QUERY_KEY,
          illustId,
        ])!

        if (snapshot.bookmarkData) return snapshot

        client.setQueryData<Pixiv.IllustInfo>([QUERY_KEY, illustId], {
          ...snapshot,
          bookmarkCount: snapshot.bookmarkCount + 1,
          bookmarkData: { id: '', private: variables.restrict || false },
        })

        return snapshot
      },
      onSettled: (data, error, variables, snapshot) => {
        if (error) {
          console.log(error)
          client.setQueryData([QUERY_KEY, illustId], snapshot)
        }
        client.invalidateQueries([QUERY_KEY, illustId])
      },
    }
  )
}
