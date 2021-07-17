import { useCallback } from 'react'
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { fetchPages, fetchUgoira } from '../../externals/fetch'

const QUERY_KEY = 'PAGES'
const UGOIRA_QUERY_KEY = 'UGOIRA'

export const prefetchPages = (client: QueryClient, id: string) =>
  client.prefetchQuery([QUERY_KEY, id], () => fetchPages(id))

export function usePagesQuery(id: string) {
  return useQuery([QUERY_KEY, id], () => fetchPages(id))
}

export function useUgoiraQuery(id: string) {
  return useQuery([UGOIRA_QUERY_KEY, id], () => fetchUgoira(id))
}

export function useGetPages() {
  const queryClient = useQueryClient()

  return useCallback(
    (id: string) => queryClient.getQueryData<Pixiv.Pages>([QUERY_KEY, id]),
    [queryClient]
  )
}
