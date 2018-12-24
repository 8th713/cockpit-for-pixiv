import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useClient } from '.'
import { success, failure } from './utils'
import { Result, Frame, AsyncStatus } from '../interfaces'
import { loadZip } from '../externals/loadZip'

const defaultState: Result<Frame[]> = {
  status: AsyncStatus.Loading,
  value: null
}

export function useUgoira(illustId: string) {
  const { client, ac } = useClient()
  const idRef = useRef(illustId)
  const [result, update] = useState<Result<Frame[]>>(defaultState)
  const internal = useMemo(() => {
    function read(id: string) {
      client.ugoira
        .read({ id, ac })
        .then(value => loadZip(value, ac))
        .then(
          images => {
            if (id === idRef.current) {
              update(success(images))
            }
          },
          error => {
            client.ugoira.remove({ id, ac })
            if (error.name === 'AbortError') return
            if (id === idRef.current) {
              update(failure(error))
            }
          }
        )
    }

    function reload(id: string) {
      client.ugoira.remove({ id, ac })
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
