import { QueryClient, useQuery } from 'react-query'
import { fetchRecentIllusts } from '../../../externals/fetch'
import { useIllustQuery } from '../illustQuery'

const QUERY_KEY = 'RECENT_ILLUSTS'

export const prefetchRecentIllusts = (client: QueryClient, id: string) =>
  client.prefetchQuery([QUERY_KEY, id], () => fetchRecentIllusts(id))

export const useRecentIllustsQuery = (illustId: string) => {
  const { data: illust } = useIllustQuery(illustId)
  const id = illust?.userId
  return useQuery([QUERY_KEY, id], () => fetchRecentIllusts(id!), {
    enabled: id !== undefined,
  })
}
