import { useQuery } from 'react-query'
import { fetchMovie } from '../../externals/fetch'

export type MovieQuery = ReturnType<typeof useStickyMovieQuery>

const QUERY_KEY = 'MOVIE'

export function useStickyMovieQuery(illustId: string) {
  const query = useQuery([QUERY_KEY, illustId], () => fetchMovie(illustId), {
    cacheTime: 0,
    keepPreviousData: true,
    notifyOnChangeProps: 'tracked',
  })

  return {
    frames: query.data,
    isError: query.isError,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}
