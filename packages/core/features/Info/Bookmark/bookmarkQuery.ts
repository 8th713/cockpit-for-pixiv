import { useQuery } from 'react-query'
import { fetchBookmarkForm } from '../../../externals/fetch'

const QUERY_KEY = 'BOOKMARK'

export function useBookmarkQuery(id: string) {
  return useQuery([QUERY_KEY, id], () => fetchBookmarkForm(id))
}
