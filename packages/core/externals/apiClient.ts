import ky from 'ky'
import { LRUMap } from 'lru_map'
import { LABEL } from '../constants'
import { createCache } from '../hooks/useCache'
import {
  AccountTagList,
  BookmarkData,
  BookmarkForm,
  BookmarkPost,
  GlobalData,
  Illust,
  LikeData,
  Pages,
  Ugoira,
  User
} from '../interfaces'
import { loadZip } from './loadZip'

export type APIClient = ReturnType<typeof createAPIClient>

export function createAPIClient(globalData: GlobalData) {
  const { userId: yourId, token } = globalData
  const api = ky.create({
    credentials: 'same-origin',
    cache: 'no-store',
    retry: 1
  })
  const isSelf = (userId: string) => userId === yourId

  /**
   * 画像情報
   *
   * GET /ajax/illust/:illustId/pages
   *
   * @param {string} illustId イラスト識別子
   */
  async function fetchPages(illustId: string) {
    try {
      const data = await api
        .get(`/ajax/illust/${illustId}/pages`, { cache: 'force-cache' })
        .json<{ body: Pages }>()

      return data.body
    } catch (error) {
      console.error(LABEL, error)
      return null
    }
  }

  /**
   * うごイラ情報
   *
   * GET /ajax/illust/:illustId/ugoira_meta
   * @param {string} illustId イラスト識別子
   */
  async function fetchUgoira(illustId: string) {
    try {
      const data = await api
        .get(`/ajax/illust/${illustId}/ugoira_meta`, { cache: 'force-cache' })
        .json<{ body: Ugoira }>()
      return loadZip(data.body)
    } catch (error) {
      console.error(LABEL, error)
      return null
    }
  }

  /**
   * 作品情報
   *
   * GET /ajax/illust/:illustId
   * @param {string} illustId イラスト識別子
   */
  async function fetchIllust(illustId: string) {
    try {
      const data = await api
        .get(`/ajax/illust/${illustId}`)
        .json<{ body: Illust }>()
      return data.body
    } catch (error) {
      console.error(LABEL, error)
      return null
    }
  }

  /**
   * ユーザー情報
   *
   * GET /ajax/user/:userId
   * @param {string} userId ユーザー識別子
   */
  async function fetchUser(userId: string) {
    try {
      const data = await api.get(`/ajax/user/${userId}`).json<{ body: User }>()
      return data.body
    } catch (error) {
      console.error(LABEL, error)
      return null
    }
  }

  /**
   * ブックマークフォーム
   *
   * GET /bookmark_add.php
   * @param {'illust'} type リクエストタイプ
   * @param {string} illust_id イラスト識別子
   */
  async function fetchBookmarkForm(illustId: string) {
    try {
      const data = await api
        .get('/bookmark_add.php', {
          searchParams: { type: 'illust', illust_id: illustId }
        })
        .text()
      return parseFormHTML(data)
    } catch (error) {
      console.error(LABEL, error)
      return null
    }
  }

  /**
   * いいね！
   *
   * POST /ajax/illusts/like
   * @param {string} illsut_id イラスト識別子
   */
  async function likeBy(illustId: string) {
    const data = await api
      .post('/ajax/illusts/like', {
        headers: { 'x-csrf-token': token },
        json: { illust_id: illustId }
      })
      .json<{ body: LikeData }>()
    return data.body
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
  async function bookmarkBy(illustId: string, body: BookmarkPost) {
    const { restrict = false, comment = '', tags = [] } = body
    const data = await api
      .post('/ajax/illusts/bookmarks/add', {
        headers: { 'x-csrf-token': token },
        json: {
          illust_id: illustId,
          restrict: restrict ? 1 : 0,
          comment,
          tags
        }
      })
      .json<{ body: BookmarkData }>()
    return data.body
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
  async function followUser(userId: string, restrict: boolean) {
    const searchParams = new URLSearchParams()
    searchParams.append('mode', 'add')
    searchParams.append('type', 'user')
    searchParams.append('user_id', userId)
    searchParams.append('tag', '')
    searchParams.append('restrict', restrict ? '1' : '0')
    searchParams.append('format', 'json')
    return await api
      .post('/bookmark_add.php', {
        headers: { 'x-csrf-token': token },
        body: searchParams
      })
      .json<never>()
  }

  return {
    token,
    yourId,
    isSelf,
    usePages: createCache(fetchPages, new LRUMap(20)),
    useUgoira: createCache(fetchUgoira, new LRUMap(2)),
    useIllust: createCache(fetchIllust, new LRUMap(20)),
    useUser: createCache(fetchUser, new LRUMap(20)),
    useBookmarkForm: createCache(fetchBookmarkForm, new LRUMap(1)),
    likeBy,
    bookmarkBy,
    followUser
  }
}

function parseFormHTML(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const form = doc.querySelector<HTMLFormElement>(
    'form[action^="bookmark_add.php"]'
  )!
  const data = new FormData(form)
  const script = doc.querySelector('.tag-cloud-container + script')!
  const userTags = parseUserTagList(script.innerHTML)
  const res: BookmarkForm = {
    comment: '',
    tags: '',
    restrict: 0,
    userTags
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
function parseUserTagList(text: string) {
  const parsedText = JSON.parse(text.slice(21, -1))
  const userTags: AccountTagList = JSON.parse(parsedText)

  return Object.entries(userTags).map(([name, value]) => ({
    ...value,
    name
  }))
}
