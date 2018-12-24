import wretch from 'wretch'
import { createResource } from './cache'
import * as Types from '../interfaces'

export function createClient(pixiv: Types.PixivGlobalData): Types.Client {
  console.log(pixiv)

  const req = wretch()
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')

  const body = req.resolve(resolver => resolver.json(data => data.body))

  /**
   * ユーザー情報
   *
   * GET /ajax/user/:userId
   * @param {string} userId ユーザー識別子
   */
  const user = createResource(
    ({ id, ac }: Types.ResourceInputs) => {
      return body
        .url(`/ajax/user/${id}`)
        .signal(ac)
        .get() as Promise<Types.User>
    },
    props => props.id
  )

  /**
   * 作品情報
   *
   * GET /ajax/illust/:illustId
   * @param {string} illustId イラスト識別子
   */
  const illust = createResource(
    ({ id, ac }: Types.ResourceInputs) => {
      return body
        .url(`/ajax/illust/${id}`)
        .signal(ac)
        .get() as Promise<Types.Illust>
    },
    props => props.id
  )

  /**
   * 画像情報
   *
   * GET /ajax/illust/:illustId/pages
   *
   * @param {string} illustId イラスト識別子
   */
  const pages = createResource(
    ({ id, ac }: Types.ResourceInputs) => {
      return body
        .url(`/ajax/illust/${id}/pages`)
        .signal(ac)
        .get() as Promise<Types.Pages>
    },
    props => props.id
  )

  /**
   * うごイラ情報
   *
   * GET /ajax/illust/:illustId/ugoira_meta
   * @param {string} illustId イラスト識別子
   */
  const ugoira = createResource(
    ({ id, ac }: Types.ResourceInputs) => {
      return body
        .url(`/ajax/illust/${id}/ugoira_meta`)
        .signal(ac)
        .get() as Promise<Types.Ugoira>
    },
    props => props.id
  )

  /**
   * ブックマークフォーム
   *
   * GET /bookmark_add.php
   * @param {'illust'} type リクエストタイプ
   * @param {string} illust_id イラスト識別子
   */
  const bookmarkForm = createResource(
    ({ id, ac }: Types.ResourceInputs) => {
      return req
        .url('/bookmark_add.php')
        .query({ type: 'illust', illust_id: id })
        .signal(ac)
        .get()
        .text(parseFormHTML)
    },
    props => props.id
  )
  function parseFormHTML(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const form = doc.querySelector<HTMLFormElement>(
      'form[action^="bookmark_add.php"]'
    )!
    const data = new FormData(form)
    const res: Types.BookmarkForm = {
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
  const accountTags = createResource(
    (ac: AbortController) => {
      return req
        .url('/rpc/illust_bookmark_tags.php')
        .query({ attributes: 'lev,total', tt: pixiv.token })
        .signal(ac)
        .get()
        .json(parseAccountTagList)
    },
    () => pixiv.token,
    1
  )
  function parseAccountTagList(json: Types.AccountTagList) {
    return Object.entries(json).map(([name, value]) => ({
      ...value,
      name
    }))
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
  function follow(userId: string, restrict: boolean) {
    return req
      .url('/bookmark_add.php')
      .headers({ 'x-csrf-token': pixiv.token })
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
  }

  /**
   * いいね！
   *
   * POST /ajax/illusts/like
   * @param {string} illsut_id イラスト識別子
   */
  function like(illustId: string): Promise<Types.LikeData> {
    return body
      .url('/ajax/illusts/like')
      .headers({ 'x-csrf-token': pixiv.token })
      .post({ illust_id: illustId })
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
  function bookmark(
    illustId: string,
    { restrict = false, comment = '', tags = [] }: Types.BookmarkPost
  ): Promise<Types.BookmarkData> {
    return body
      .url('/ajax/illusts/bookmarks/add')
      .headers({ 'x-csrf-token': pixiv.token })
      .post({
        illust_id: illustId,
        restrict: restrict ? 1 : 0,
        comment,
        tags
      })
  }

  function isSelf(id: string) {
    return id === pixiv.userId
  }

  return {
    user,
    illust,
    pages,
    ugoira,
    bookmarkForm,
    accountTags,
    follow,
    bookmark,
    like,
    isSelf
  }
}
