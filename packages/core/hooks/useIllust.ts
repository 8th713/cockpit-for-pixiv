import { useContext } from 'react'
import { AddonContext, ClientContext } from '../contexts'
import { openTwitter } from '../externals/share'
import { BookmarkPost, DownloadRequestAction, Illust } from '../interfaces'

export function useIllust(illustId: string) {
  const addonStore = useContext(AddonContext)
  const { useIllustCache, likeBy, bookmarkBy } = useContext(ClientContext)
  const { read, replace, reload: retry } = useIllustCache(illustId)
  const canDonwload = addonStore.isConnected('download')

  function like() {
    const illust = read()

    if (!illust) return
    if (!illust.isBookmarkable) return
    if (illust.likeData) return

    replace(likeIllust(illust))
    likeBy(illustId).then(value => {
      if (value) {
        retry()
      } else {
        replace(illust)
      }
    })
  }
  function bookmark(body: BookmarkPost) {
    const illust = read()

    if (!illust) return
    if (!illust.isBookmarkable) return

    replace(bookmarkIllust(illust))
    bookmarkBy(illustId, body).then(value => {
      if (value) {
        retry()
      } else {
        replace(illust)
      }
    })
  }
  function share() {
    const illust = read()

    if (!illust) return

    openTwitter(illust)
  }
  function download() {
    if (canDonwload === false) return

    const illust = read()

    if (!illust) return

    const action: DownloadRequestAction = {
      type: 'DOWNLOAD_REQUEST',
      payload: illust
    }

    addonStore.dispatch('download', action)
  }

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
