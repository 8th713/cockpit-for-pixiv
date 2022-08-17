import { useCallback } from 'react'
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { fetchImages } from '../../externals/fetch'

export type ImagesQuery = ReturnType<typeof useStickyImages>

const QUERY_KEY = 'PAGES'

export function prefetchImages(client: QueryClient, illustId: string) {
  return client.fetchQuery([QUERY_KEY, illustId], () => fetchImages(illustId))
}

export function useStickyImages(illustId: string) {
  const query = useQuery([QUERY_KEY, illustId], () => fetchImages(illustId), {
    keepPreviousData: true,
    notifyOnChangeProps: 'tracked',
  })

  return {
    images: query.data,
    isError: query.isError,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isPreviousData: query.isPreviousData,
    refetch: query.refetch,
  }
}

export function useGetImages() {
  const queryClient = useQueryClient()
  const getImages = useCallback(
    (illustId: string) =>
      queryClient.getQueryData<Pixiv.Images>([QUERY_KEY, illustId]),
    [queryClient]
  )

  return getImages
}
