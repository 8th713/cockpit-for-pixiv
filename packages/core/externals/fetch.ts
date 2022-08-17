import ky from 'ky'
import { loadZip } from './loadZip'

const api = ky.create({
  credentials: 'same-origin',
  retry: 0,
})

/**
 * 画像情報
 *
 * GET /ajax/illust/:illustId/pages
 *
 * @param {string} illustId イラスト識別子
 */
export async function fetchImages(illustId: string) {
  const { body, error, message } = await api
    .get(`/ajax/illust/${illustId}/pages`)
    .json<Pixiv.ResponseData<Pixiv.Images>>()

  if (error) throw new Error(message)
  return body
}

/**
 * うごイラ情報
 *
 * GET /ajax/illust/:illustId/ugoira_meta
 * @param {string} illustId イラスト識別子
 */
export async function fetchMovie(illustId: string) {
  const { body, error, message } = await api
    .get(`/ajax/illust/${illustId}/ugoira_meta`)
    .json<Pixiv.ResponseData<Pixiv.Ugoira>>()

  if (error) throw new Error(message)
  return loadZip(body)
}

/**
 * 作品
 *
 * GET /ajax/illust/:illustId
 * @param {string} illustId イラスト識別子
 */
export async function fetchIllustInfo(illustId: string) {
  const { body, error, message } = await api
    .get(`/ajax/illust/${illustId}`)
    .json<Pixiv.ResponseData<Pixiv.IllustInfo>>()

  if (error) throw new Error(message)
  return body
}

/**
 * ユーザー
 *
 * GET /ajax/user/:userId?full=1
 * @param {string} userId ユーザー識別子
 */
export async function fetchUser(userId: string) {
  const { body, error, message } = await api
    .get(`/ajax/user/${userId}?full=1`)
    .json<Pixiv.ResponseData<Pixiv.User>>()

  if (error) throw new Error(message)
  return body
}

/**
 * ユーザーの最近の作品
 *
 * GET /ajax/user/:userId/profile/top
 * @param {string} userId ユーザー識別子
 */
export async function fetchRecentWorks(userId: string) {
  const { body, error, message } = await api
    .get(`/ajax/user/${userId}/profile/top`)
    .json<Pixiv.ResponseData<Pixiv.RecentWorks>>()

  if (error) throw new Error(message)
  return mergeWorks(body)
}

function mergeWorks({ illusts, manga }: Pixiv.RecentWorks) {
  const data = { ...illusts, ...manga }

  return Object.values(data).sort((a, b) => Number(b.id) - Number(a.id))
}

/**
 * ブックマークフォーム
 *
 * GET /bookmark_add.php
 * @param {'illust'} type リクエストタイプ
 * @param {string} illust_id イラスト識別子
 */
export async function fetchBookmarkForm(illustId: string) {
  const searchParams = { type: 'illust', illust_id: illustId }
  const data = await api.get('/bookmark_add.php', { searchParams }).text()

  return parseFormHTML(data)
}

function parseFormHTML(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const form = doc.querySelector<HTMLFormElement>(
    'form[action^="bookmark_add.php"]'
  )!
  const data = new FormData(form)
  const script = doc.querySelector('.tag-cloud-container + script')!
  const userTags = parseUserTagList(script.innerHTML)
  const res: Pixiv.BookmarkState = {
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

function parseUserTagList(text: string): Pixiv.MyTag[] {
  // const parsedText = JSON.parse(text.slice(21, -1))
  // const userTags: Pixiv.AccountTagList = JSON.parse(parsedText)
  const userTags: Pixiv.AccountTagList = JSON.parse(text.slice(22, -2))

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
export async function likeBy(illustId: string) {
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
export async function bookmarkBy(
  illustId: string,
  { restrict = false, comment = '', tags = [] }: Pixiv.BookmarkPost
) {
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
export async function followUser(userId: string, restrict: boolean) {
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

const savedGlobal: Pixiv.GlobalData = { token: '', userId: '' }

export async function fetchGlobal() {
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

  return Object.assign(savedGlobal, parsedData)
}

function parseGlobal(html: string): Pixiv.GlobalData {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const meta = doc.querySelector<HTMLMetaElement>('#meta-global-data')!
  const data = JSON.parse(meta.content)
  const token: string = data.token
  const userId: string = data.userData.id

  return { token, userId }
}
