import { useCallback, useContext } from 'react'
import { ClientContext } from '../contexts'
import { useAddon } from './useAddon'
import { Illust, BookmarkPost, DownloadRequestAction } from '../interfaces'
import { openTwitter } from '../externals/share'

export function useIllust(illustId: string) {
  const addonStore = useAddon()
  const { useIllustCache, likeBy, bookmarkBy } = useContext(ClientContext)
  const { read, remove: retry, replace, reload } = useIllustCache(illustId)
  const like = useCallback(() => {
    const illust = read()

    if (!illust) return
    if (!illust.isBookmarkable) return
    if (illust.likeData) return

    replace(likeIllust(illust))
    likeBy(illustId).then(() => reload(), () => replace(illust))
  }, [illustId])
  const bookmark = useCallback(
    (body: BookmarkPost) => {
      const illust = read()

      if (!illust) return
      if (!illust.isBookmarkable) return

      replace(bookmarkIllust(illust))
      bookmarkBy(illustId, body).then(() => reload(), () => replace(illust))
    },
    [illustId]
  )
  const share = useCallback(() => {
    const illust = read()

    if (!illust) return

    openTwitter(illust)
  }, [illustId])
  const download = useCallback(() => {
    if (canDonwload === false) return

    const illust = read()

    if (!illust) return

    const action: DownloadRequestAction = {
      type: 'DOWNLOAD_REQUEST',
      payload: illust
    }

    addonStore.dispatch('download', action)
  }, [illustId])
  const canDonwload = addonStore.isConnected('download')

  return { read, retry, like, bookmark, share, download, canDonwload }
}

function likeIllust(illust: Illust): Illust {
  const likeCount = illust.likeCount + 1

  return { ...illust, likeCount, likeData: true }
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
