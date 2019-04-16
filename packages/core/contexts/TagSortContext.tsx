import { useSort } from '../hooks'
import { createProvider } from './utlis'

export const TagSortProvider = createProvider(useSort, 'TagSortProvider')
