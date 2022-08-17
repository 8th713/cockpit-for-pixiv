import { useQuery } from 'react-query'
import { fetchBookmarkForm } from '../../externals/fetch'

const QUERY_KEY = 'BOOKMARK'

export function useBookmarkQuery(illustId: string) {
  const query = useQuery(
    [QUERY_KEY, illustId],
    () => fetchBookmarkForm(illustId),
    {
      notifyOnChangeProps: 'tracked',
    }
  )

  return {
    bookmarkState: query.data,
    isError: query.isError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}
