import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { useClient } from '.'
import { success, failure } from './utils'
import { Result, BookmarkForm, AsyncStatus } from '../interfaces'

const defaultState: Result<BookmarkForm> = {
  status: AsyncStatus.Loading,
  value: null
}

export function useBookmarkForm(illustId: string) {
  const { client, ac } = useClient()
  const [result, update] = useState<Result<BookmarkForm>>(defaultState)
  const idRef = useRef(illustId)
  const internal = useMemo(() => {
    function read(id: string) {
      client.bookmarkForm.read({ id, ac }).then(
        value => {
          if (id === idRef.current) {
            update(success(value))
          }
        },
        error => {
          client.bookmarkForm.remove({ id, ac })
          if (error.name === 'AbortError') return
          if (id === idRef.current) {
            update(failure(error))
          }
        }
      )
    }

    function reload(id: string) {
      client.bookmarkForm.remove({ id, ac })
      read(id)
    }

    return { read, reload }
  }, [])
  const retry = useCallback(() => {
    if (idRef.current) {
      update(defaultState)
      internal.reload(idRef.current)
    }
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

  return { result, retry }
}
