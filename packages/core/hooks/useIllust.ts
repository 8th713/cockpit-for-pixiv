import wretch from 'wretch'
import { useCallback } from 'react'
import { createCacheHook } from './useCache'
import { useAddon } from './useAddon'
import { useAbort } from './useAbort'
import {
  Illust,
  LikeData,
  BookmarkPost,
  BookmarkData,
  DownloadRequestAction
} from '../interfaces'
import { pixivGlobalData } from '../externals/pixivGlobalData'
import { openTwitter } from '../externals/share'

const useCache = createCacheHook(fetchIllust)

export function useIllust(illustId: string) {
  const addonStore = useAddon()
  const { abortable } = useAbort()
  const { read, remove: retry, replace } = useCache(illustId)
  const like = useCallback(
    () => {
      const illust = read()

      if (!illust.isBookmarkable) return
      if (illust.likeData) return
      replace(likeIllust(illust))
      abortable(likeBy(illustId, pixivGlobalData.token)).then(retry)
    },
    [illustId]
  )
  const bookmark = useCallback(
    (data: BookmarkPost) => {
      const illust = read()

      if (!illust.isBookmarkable) return
      if (illust.likeData) return
      replace(bookmarkIllust(illust))
      abortable(bookmarkBy(illustId, data, pixivGlobalData.token)).then(retry)
    },
    [illustId]
  )
  const share = useCallback(
    () => {
      const illust = read()

      openTwitter(illust)
    },
    [illustId]
  )
  const download = useCallback(
    () => {
      if (canDonwload === false) return

      const illust = read()
      const action: DownloadRequestAction = {
        type: 'DOWNLOAD_REQUEST',
        payload: illust
      }
      addonStore.dispatch('download', action)
    },
    [illustId]
  )
  const canDonwload = addonStore.isConnected('download')

  return { read, retry, like, bookmark, share, download, canDonwload }
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
}

/**
 * いいね！
 *
 * POST /ajax/illusts/like
 * @param {string} illsut_id イラスト識別子
 */
function likeBy(illustId: string, token: string) {
  return wretch('/ajax/illusts/like')
    .headers({ 'x-csrf-token': token })
    .post({ illust_id: illustId })
    .json<LikeData>()
}
function likeIllust(illust: Illust): Illust {
  const likeCount = illust.likeCount + 1

  return { ...illust, likeCount, likeData: true }
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
function bookmarkBy(
  illustId: string,
  { restrict = false, comment = '', tags = [] }: BookmarkPost,
  token: string
) {
  return wretch('/ajax/illusts/bookmarks/add')
    .headers({ 'x-csrf-token': token })
    .post({
      illust_id: illustId,
      restrict: restrict ? 1 : 0,
      comment,
      tags
    })
    .json<BookmarkData>()
}
function bookmarkIllust(illust: Illust): Illust {
  const bookmarkCount = illust.bookmarkData
    ? illust.bookmarkCount
    : illust.bookmarkCount + 1
  const bookmarkData = illust.bookmarkData
    ? illust.bookmarkData
    : { id: '', private: false }

  return { ...illust, bookmarkCount, bookmarkData }
}
