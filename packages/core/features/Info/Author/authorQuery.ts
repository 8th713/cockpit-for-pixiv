import {
  QueryClient,
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { fetchUser, followUser } from '../../../externals/fetch'
import { useIllustQuery } from '../illustQuery'

export type AuthorQueryResult = QueryObserverResult<Pixiv.User> & {
  illust: Pixiv.Illust | undefined
}

const QUERY_KEY = 'AUTHOR'

export const prefetchAuthor = (client: QueryClient, id: string) =>
  client.prefetchQuery([QUERY_KEY, id], () => fetchUser(id))

export const useAuthorQuery = (illustId: string): AuthorQueryResult => {
  const { data: illust } = useIllustQuery(illustId)
  const id = illust?.userId
  const values = useQuery([QUERY_KEY, id], () => fetchUser(id!), {
    enabled: id !== undefined,
  })

  return { illust, ...values }
}

export const useFollowMutation = (id: string) => {
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
