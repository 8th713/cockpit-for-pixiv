import wretch from 'wretch'
import { createCacheHook } from './useCache'
import { AccountTagList } from '../interfaces'
import { pixivGlobalData } from '../externals/pixivGlobalData'

const useCache = createCacheHook(fetchUserTags)

export function useUserTags() {
  const { read, remove: retry } = useCache(pixivGlobalData.token)

  return { read, retry }
}

/**
 * アカウントタグリスト
 *
 * GET /rpc/illust_bookmark_tags.php
 * @param {'lev,total'} attributes 要求属性名リスト
 * @param {string} tt トークン
 */
function fetchUserTags(token: string) {
  return wretch('/rpc/illust_bookmark_tags.php')
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')
    .query({ attributes: 'lev,total', tt: token })
    .get()
    .json(parseAccountTagList)
    .catch(error => {
      console.error(error)
      return null
    })
}
function parseAccountTagList(json: AccountTagList) {
  return Object.entries(json).map(([name, value]) => ({
    ...value,
    name
  }))
}
