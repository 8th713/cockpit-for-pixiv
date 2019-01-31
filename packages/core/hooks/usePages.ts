import wretch from 'wretch'
import { createCacheHook } from './useCache'
import { Pages } from '../interfaces'

const useCache = createCacheHook(fetchPages)

export function usePages(illustId: string) {
  const { read, remove: retry } = useCache(illustId)

  return { read, retry }
}

/**
 * 画像情報
 *
 * GET /ajax/illust/:illustId/pages
 *
 * @param {string} illustId イラスト識別子
 */
function fetchPages(illustId: string) {
  return wretch(`/ajax/illust/${illustId}/pages`)
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')
    .get()
    .json(data => {
      const pages: Pages = data.body
      const count = pages.length
      const isUgoira = pages[0].urls.original.includes('ugoira0')

      return { pages, count, isUgoira }
    })
    .catch(error => {
      console.error(error)
      return null
    })
}
