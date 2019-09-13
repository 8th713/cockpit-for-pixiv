import { fetchPages } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'

export const usePages = createCache(fetchPages, 20)
