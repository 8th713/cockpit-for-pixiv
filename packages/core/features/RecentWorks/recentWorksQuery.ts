import { QueryClient, useQuery } from 'react-query'
import { fetchRecentWorks } from '../../externals/fetch'
import { useStickyInfo } from '../Info/infoQuery'

const QUERY_KEY = 'RECENT_ILLUSTS'

export function prefetchRecentWorks(client: QueryClient, userId: string) {
  return client.fetchQuery([QUERY_KEY, userId], () => fetchRecentWorks(userId))
}

export function useStickyRecentWorks(illustId: string) {
  const { info } = useStickyInfo(illustId)
  const enabled = !!info
  const userId = info?.userId
  const query = useQuery([QUERY_KEY, userId], () => fetchRecentWorks(userId!), {
    keepPreviousData: true,
    notifyOnChangeProps: 'tracked',
    enabled,
  })

  return {
    info,
    works: query.data,
  }
}
