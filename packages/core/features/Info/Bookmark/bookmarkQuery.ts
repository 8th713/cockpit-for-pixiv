import { useQuery } from 'react-query'
import { fetchBookmarkForm } from '../../../externals/fetch'

const QUERY_KEY = 'BOOKMARK'

export const useBookmarkQuery = (id: string) =>
  useQuery([QUERY_KEY, id], () => fetchBookmarkForm(id))
