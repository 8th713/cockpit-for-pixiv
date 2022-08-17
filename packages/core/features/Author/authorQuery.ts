import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchUser, followUser } from '../../externals/fetch'
import { useStickyInfo } from '../Info/infoQuery'

const QUERY_KEY = 'AUTHOR'

export function prefetchAuthor(client: QueryClient, userId: string) {
  return client.fetchQuery([QUERY_KEY, userId], () => fetchUser(userId))
}

export function useStickyAuthor(illustId: string) {
  const { info } = useStickyInfo(illustId)
  const enabled = !!info
  const userId = info?.userId
  const query = useQuery([QUERY_KEY, userId], () => fetchUser(userId!), {
    keepPreviousData: true,
    notifyOnChangeProps: 'tracked',
    enabled,
  })

  return {
    info,
    author: query.data,
    isError: query.isError,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}

export function useFollowMutation(id: string) {
  const queryClient = useQueryClient()

  return useMutation(
    (isPrivate: boolean = false) => followUser(id, isPrivate),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEY, id])

        const snapshot = queryClient.getQueryData<Pixiv.User>([QUERY_KEY, id])!

        if (snapshot.isFollowed) return snapshot

        queryClient.setQueryData<Pixiv.User>([QUERY_KEY, id], {
          ...snapshot,
          following: snapshot.following + 1,
          isFollowed: true,
        })

        return snapshot
      },
      onSettled: (data, error, isPrivate, snapshot) => {
        if (error) {
          console.log(error)
          queryClient.setQueryData([QUERY_KEY, id], snapshot)
        }
        queryClient.invalidateQueries([QUERY_KEY, id])
      },
    }
  )
}
