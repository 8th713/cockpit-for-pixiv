import { useMemo, useEffect, useRef } from 'react'
import { useClient, useAddon, useStateRef } from '.'
import { success, failure } from './utils'
import {
  Result,
  Illust,
  AsyncStatus,
  BookmarkPost,
  DownloadRequestAction
} from '../interfaces'
import { openTwitter } from '../externals/share'

const defaultState: Result<Illust> = {
  status: AsyncStatus.Loading,
  value: null
}

export function useIllust(illustId: string) {
  const addonStore = useAddon()
  const { client, ac } = useClient()
  const idRef = useRef(illustId)
  const [result, update, getResult] = useStateRef<Result<Illust>>(defaultState)
  const internal = useMemo(() => {
    function read(id: string) {
      client.illust.read({ id, ac }).then(
        value => {
          if (id === idRef.current) {
            update(success(value))
          }
        },
        error => {
          client.illust.remove({ id, ac })
          if (error.name === 'AbortError') return
          if (id === idRef.current) {
            update(failure(error))
          }
        }
      )
    }

    function reload(id: string) {
      client.illust.remove({ id, ac })
      read(id)
    }

    return { read, reload }
  }, [])
  const actions = useMemo(() => {
    function retry() {
      if (idRef.current) {
        update(defaultState)
        internal.reload(idRef.current)
      }
    }

    function like() {
      const result = getResult()
      if (result.status !== AsyncStatus.Success) return

      const { value } = result
      if (value.likeData || !value.isBookmarkable) return

      update(likeIllust(value))
      client
        .like(value.illustId)
        .then(
          () => internal.reload(value.illustId),
          () => internal.read(value.illustId)
        )
    }

    function bookmark(data: BookmarkPost) {
      const result = getResult()
      if (result.status !== AsyncStatus.Success) return

      const { value } = result
      if (!value.isBookmarkable) return

      update(bookmarkIllust(value))
      client
        .bookmark(value.illustId, data)
        .then(
          () => internal.reload(value.illustId),
          () => internal.read(value.illustId)
        )
    }

    function share() {
      const result = getResult()
      if (result.status !== AsyncStatus.Success) return

      openTwitter(result.value)
    }

    function download() {
      const result = getResult()
      if (result.status !== AsyncStatus.Success) return
      if (canDonwload() === false) return
      const action: DownloadRequestAction = {
        type: 'DOWNLOAD_REQUEST',
        payload: result.value
      }
      addonStore.dispatch('download', action)
    }

    function canDonwload() {
      return addonStore.isConnected('download')
    }

    return { retry, like, bookmark, share, download, canDonwload }
  }, [])

  idRef.current = illustId
  useEffect(
    () => {
      if (illustId) {
        update(defaultState)
        internal.read(illustId)
      }
    },
    [illustId]
  )

  return { result, actions }
}

function likeIllust(illust: Illust): Result<Illust> {
  const likeCount = illust.likeCount + 1

  return success({
    ...illust,
    likeCount,
    likeData: true
  })
}

function bookmarkIllust(illust: Illust): Result<Illust> {
  const bookmarkCount = illust.bookmarkData
    ? illust.bookmarkCount
    : illust.bookmarkCount + 1
  const bookmarkData = illust.bookmarkData
    ? illust.bookmarkData
    : { id: '', private: false }

  return success({
    ...illust,
    bookmarkCount,
    bookmarkData
  })
}
