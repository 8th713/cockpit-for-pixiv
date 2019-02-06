import wretch from 'wretch'
import { LRUMap } from 'lru_map'
import { createCacheHook } from './useCache'
import { loadZip } from '../externals/loadZip'
import { Ugoira } from '../interfaces'

const useCache = createCacheHook(fetchUgoira, new LRUMap(3))

export function useUgoira(illustId: string) {
  const { read, remove: retry } = useCache(illustId)

  return { read, retry }
}

/**
 * うごイラ情報
 *
 * GET /ajax/illust/:illustId/ugoira_meta
 * @param {string} illustId イラスト識別子
 */
function fetchUgoira(illustId: string) {
  return wretch(`/ajax/illust/${illustId}/ugoira_meta`)
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')
    .get()
    .json<Ugoira>(data => data.body)
    .then(loadZip)
    .catch(error => {
      console.error(error)
      return null
    })
}
