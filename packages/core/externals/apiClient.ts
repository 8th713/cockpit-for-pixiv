import ky from 'ky'
import { LABEL } from '../constants'
// import { createGlobalData } from './globalData'
import { loadZip } from './loadZip'

const api = ky.create({
  credentials: 'same-origin',
  cache: 'no-store',
  retry: 1,
})

// export const isSelf = (userId: string) => userId === createGlobalData().userId

/**
 * 画像情報
 *
 * GET /ajax/illust/:illustId/pages
 *
 * @param {string} illustId イラスト識別子
 */
export const fetchPages = async (illustId: string) => {
  try {
    const {
      body,
      error,
      message,
    } = await api
      .get(`/ajax/illust/${illustId}/pages`, { cache: 'force-cache' })
      .json<Pixiv.ResponseData<Pixiv.Pages>>()

    if (error) throw new Error(message)
    return body
  } catch (error) {
    console.error(`${LABEL}: failed fetchPages`, error)
    return null
  }
}

/**
 * うごイラ情報
 *
 * GET /ajax/illust/:illustId/ugoira_meta
 * @param {string} illustId イラスト識別子
 */
export const fetchUgoira = async (illustId: string) => {
  try {
    const {
      body,
      error,
      message,
    } = await api
      .get(`/ajax/illust/${illustId}/ugoira_meta`, { cache: 'force-cache' })
      .json<Pixiv.ResponseData<Pixiv.Ugoira>>()

    if (error) throw new Error(message)
    return loadZip(body)
  } catch (error) {
    console.error(`${LABEL}: failed fetchUgoira`, error)
    return null
  }
}

/**
 * 作品
 *
 * GET /ajax/illust/:illustId
 * @param {string} illustId イラスト識別子
 */
export const fetchIllust = async (illustId: string) => {
  try {
    const { body, error, message } = await api
      .get(`/ajax/illust/${illustId}`)
      .json<Pixiv.ResponseData<Pixiv.Illust>>()

    if (error) throw new Error(message)
    return body
  } catch (error) {
    console.error(`${LABEL}: failed fetchIllust`, error)
    return null
  }
}

/**
 * ユーザー
 *
 * GET /ajax/user/:userId?full=1
 * @param {string} userId ユーザー識別子
 */
export const fetchUser = async (userId: string) => {
  try {
    const { body, error, message } = await api
      .get(`/ajax/user/${userId}?full=1`)
      .json<Pixiv.ResponseData<Pixiv.User>>()

    if (error) throw new Error(message)
    return body
  } catch (error) {
    console.error(`${LABEL}: failed fetchUser`, error)
    return null
  }
}

/**
 * ユーザーの関連作品
 *
 * GET /ajax/user/:userId/profile/top
 * @param {string} userId ユーザー識別子
 */
export const fetchRelatedIllusts = async (userId: string) => {
  try {
    const { body, error, message } = await api
      .get(`/ajax/user/${userId}/profile/top`)
      .json<Pixiv.ResponseData<Pixiv.Works>>()

    if (error) throw new Error(message)
    return mergeWorks(body)
  } catch (error) {
    console.error(`${LABEL}: failed fetchRelatedIllusts`, error)
    return null
  }
}
const mergeWorks = ({ illusts, manga }: Pixiv.Works): Pixiv.RelatedIllusts => {
  const data = { ...illusts, ...manga }
  return Object.values(data).reverse()
}

/**
 * ブックマークフォーム
 *
 * GET /bookmark_add.php
 * @param {'illust'} type リクエストタイプ
 * @param {string} illust_id イラスト識別子
 */
export const fetchBookmarkForm = async (illustId: string) => {
  try {
    const data = await api
      .get('/bookmark_add.php', {
        searchParams: { type: 'illust', illust_id: illustId },
      })
      .text()
    return parseFormHTML(data)
  } catch (error) {
    console.error(`${LABEL}: failed fetchBookmarkForm`, error)
    return null
  }
}
const parseFormHTML = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const form = doc.querySelector<HTMLFormElement>(
    'form[action^="bookmark_add.php"]'
  )!
  const data = new FormData(form)
  const script = doc.querySelector('.tag-cloud-container + script')!
  const userTags = parseUserTagList(script.innerHTML)
  const res: Pixiv.BookmarkForm = {
    comment: '',
    tags: '',
    restrict: false,
    userTags,
  }

  for (const [name, value] of data.entries()) {
    if (name === 'comment') {
      res.comment = value as string
    } else if (name === 'tag') {
      res.tags = value as string
    } else if (name === 'restrict') {
      res.restrict = !!Number(value)
    }
  }

  return res
}
const parseUserTagList = (text: string): Pixiv.UserTag[] => {
  const parsedText = JSON.parse(text.slice(21, -1))
  const userTags: Pixiv.AccountTagList = JSON.parse(parsedText)

  return Object.entries(userTags).map(([name, value]) => ({
    ...value,
    name,
  }))
}

/**
 * いいね！
 *
 * POST /ajax/illusts/like
 * @param {string} illsut_id イラスト識別子
 */
export const likeBy = async (illustId: string) => {
  const { token } = await fetchGlobal()
  const { body, error, message } = await api
    .post('/ajax/illusts/like', {
      headers: { 'x-csrf-token': token },
      json: { illust_id: illustId },
    })
    .json<Pixiv.ResponseData<Pixiv.LikeData>>()

  if (error) throw new Error(message)
  return body
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
export const bookmarkBy = async (
  illustId: string,
  { restrict = false, comment = '', tags = [] }: Pixiv.BookmarkPost
) => {
  const { token } = await fetchGlobal()
  const { body, error, message } = await api
    .post('/ajax/illusts/bookmarks/add', {
      headers: { 'x-csrf-token': token },
      json: {
        illust_id: illustId,
        restrict: restrict ? 1 : 0,
        comment,
        tags,
      },
    })
    .json<Pixiv.ResponseData<Pixiv.BookmarkValue>>()

  if (error) throw new Error(message)
  return body
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
export const followUser = async (userId: string, restrict: boolean) => {
  const { token, userId: myId } = await fetchGlobal()

  if (myId === userId) throw new Error(`This user is yourself`)
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
      body: searchParams,
    })
    .json<never>()
}

declare var pixiv: {
  context: {
    token: string
  }
  user: {
    id: string
  }
}

declare var globalInitData: {
  token: string
  userData: {
    id: string
  }
}

const savedGlobal = { token: '', userId: '' }

export const fetchGlobal = async () => {
  if (savedGlobal.token.length) return savedGlobal
  if (typeof pixiv !== 'undefined') {
    savedGlobal.token = pixiv.context.token
    savedGlobal.userId = pixiv.user.id
    return savedGlobal
  }
  if (typeof globalInitData !== 'undefined') {
    savedGlobal.token = globalInitData.token
    savedGlobal.userId = globalInitData.userData.id
    return savedGlobal
  }

  const data = await api.get(location.href).text()
  const parsedData = parseGlobal(data)
  savedGlobal.token = parsedData.token
  savedGlobal.userId = parsedData.userId
  return savedGlobal
}
const parseGlobal = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const meta = doc.querySelector<HTMLMetaElement>('#meta-global-data')!
  const { token, userData }: { token: string; userData: any } = JSON.parse(
    meta.content
  )
  const userId: string = userData.id

  return { token, userId }
}
