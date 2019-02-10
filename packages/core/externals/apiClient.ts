import wretch from 'wretch'
import { LRUMap } from 'lru_map'
import { createCacheHook } from '../hooks/useCache'
import { loadZip } from './loadZip'
import { LoggingService } from './logging'
import {
  PixivGlobalData,
  Pages,
  Ugoira,
  Illust,
  LikeData,
  BookmarkPost,
  BookmarkData,
  User,
  BookmarkForm,
  AccountTagList
} from '../interfaces'

export type APIClient = ReturnType<typeof createAPIClient>

export function createAPIClient(
  globalData: PixivGlobalData,
  loggingService: LoggingService
) {
  const { userId: yourId, token } = globalData

  function isSelf(userId: string) {
    return userId === yourId
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
        loggingService.log(error, `fetchPage(${illustId})`)
        return null
      })
  }

  /**
   * 画像
   *
   * GET /ajax/illust/:illustId/pages
   *
   * @param {string} src 画像の URL
   */
  function fetchImage(src: string) {
    return new Promise<string>((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(src)
      i.onerror = () => reject(new Error(`Not found: ${src}`))
      i.src = src
    }).catch(error => {
      loggingService.log(error, `fetchImage(${src})`)
      return null
    })
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
        loggingService.log(error, `fetchUgoira(${illustId})`)
        return null
      })
  }

  /**
   * 作品情報
   *
   * GET /ajax/illust/:illustId
   * @param {string} illustId イラスト識別子
   */
  function fetchIllust(illustId: string) {
    return wretch(`/ajax/illust/${illustId}`)
      .options({ credentials: 'same-origin', cache: 'no-cache' })
      .content('application/json')
      .errorType('json')
      .get()
      .json<Illust>(data => data.body)
      .catch(error => {
        loggingService.log(error, `fetchIllust(${illustId})`)
        return null
      })
  }

  /**
   * いいね！
   *
   * POST /ajax/illusts/like
   * @param {string} illsut_id イラスト識別子
   */
  function likeBy(illustId: string) {
    return wretch('/ajax/illusts/like')
      .headers({ 'x-csrf-token': token })
      .post({ illust_id: illustId })
      .json<LikeData>()
      .catch(error => {
        loggingService.log(error, `likeBy(${illustId})`)
        return null
      })
  }

  /**
   * ブックマーク
   *
   * POST /ajax/illusts/bookmarks/add
   * @param {string} illust_id イラスト識別子
   * @param {number} restrict 0=公開/1=非公開
   * @param {stirng} comment コメント
   * @param {string[]} tags タグリスト
   */
  function bookmarkBy(illustId: string, body: BookmarkPost) {
    const { restrict = false, comment = '', tags = [] } = body

    return wretch('/ajax/illusts/bookmarks/add')
      .headers({ 'x-csrf-token': token })
      .post({
        illust_id: illustId,
        restrict: restrict ? 1 : 0,
        comment,
        tags
      })
      .json<BookmarkData>()
      .catch(error => {
        loggingService.log(error, `bookmarkBy(${illustId})`)
        return null
      })
  }

  /**
   * ユーザー情報
   *
   * GET /ajax/user/:userId
   * @param {string} userId ユーザー識別子
   */
  function fetchUser(userId: string) {
    return wretch(`/ajax/user/${userId}`)
      .options({ credentials: 'same-origin', cache: 'no-cache' })
      .content('application/json')
      .errorType('json')
      .get()
      .json<User>(data => data.body)
      .catch(error => {
        loggingService.log(error, `fetchUser(${userId})`)
        return null
      })
  }

  /**
   * フォロー
   * POST /bookmark_add.php
   *
   * Content-Type: application/x-www-form-urlencoded; charset=utf-8
   * @param {'add'} mode リクエストモード
   * @param {'user'} type リクエストタイプ
   * @param {string} user_id ユーザー識別子
   * @param {0|1} restrict 0=公開/1=非公開
   * @param {'json'} format フォーマットタイプ
   * @param {string} tt トークン
   */
  function followUser(userId: string, restrict: boolean) {
    return wretch('/bookmark_add.php')
      .headers({ 'x-csrf-token': token })
      .formUrl({
        mode: 'add',
        type: 'user',
        user_id: userId,
        tag: '',
        restrict: restrict ? 1 : 0,
        format: 'json'
      })
      .post()
      .json<never[]>()
      .catch(error => {
        loggingService.log(error, `followUser(${userId})`)
        return null
      })
  }

  /**
   * ブックマークフォーム
   *
   * GET /bookmark_add.php
   * @param {'illust'} type リクエストタイプ
   * @param {string} illust_id イラスト識別子
   */
  function fetchBookmarkForm(illustId: string) {
    return wretch('/bookmark_add.php')
      .options({ credentials: 'same-origin', cache: 'no-cache' })
      .content('application/json')
      .errorType('json')
      .query({ type: 'illust', illust_id: illustId })
      .get()
      .text(parseFormHTML)
      .catch(error => {
        loggingService.log(error, `fetchBookmarkForm(${illustId})`)
        return null
      })
  }
  function parseFormHTML(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const form = doc.querySelector<HTMLFormElement>(
      'form[action^="bookmark_add.php"]'
    )!
    const data = new FormData(form)
    const res: BookmarkForm = {
      comment: '',
      tags: '',
      restrict: 0
    }

    for (const [name, value] of data.entries()) {
      if (name === 'comment') {
        res.comment = value as string
      } else if (name === 'tag') {
        res.tags = value as string
      } else if (name === 'restrict') {
        res.restrict = Number(value) as 0 | 1
      }
    }
    return res
  }

  /**
   * アカウントタグリスト
   *
   * GET /rpc/illust_bookmark_tags.php
   * @param {'lev,total'} attributes 要求属性名リスト
   * @param {string} tt トークン
   */
  function fetchUserTags(_: string) {
    return wretch('/rpc/illust_bookmark_tags.php')
      .options({ credentials: 'same-origin', cache: 'no-cache' })
      .content('application/json')
      .errorType('json')
      .query({ attributes: 'lev,total', tt: token })
      .get()
      .json(parseAccountTagList)
      .catch(error => {
        loggingService.log(error, `fetchUserTags()`)
        return null
      })
  }
  function parseAccountTagList(json: AccountTagList) {
    return Object.entries(json).map(([name, value]) => ({
      ...value,
      name
    }))
  }

  const usePageCache = createCacheHook(fetchPages, new LRUMap(10))
  const useUgoiraCache = createCacheHook(fetchUgoira, new LRUMap(3))
  const useIllustCache = createCacheHook(fetchIllust, new LRUMap(10))
  const useUserCache = createCacheHook(fetchUser, new LRUMap(10))
  const useBookmarkCache = createCacheHook(
    fetchBookmarkForm,
    new LRUMap(1),
    true
  )
  const useUserTagsCache = createCacheHook(fetchUserTags, new LRUMap(1), true)

  return {
    token,
    yourId,
    isSelf,
    usePageCache,
    fetchImage,
    useUgoiraCache,
    useIllustCache,
    likeBy,
    bookmarkBy,
    useUserCache,
    followUser,
    useBookmarkCache,
    useUserTagsCache
  }
}
