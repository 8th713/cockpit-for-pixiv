import { fetchUgoira } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'

export const useUgoira = createCache(fetchUgoira, 2)
