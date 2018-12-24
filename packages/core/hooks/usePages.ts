import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { useClient } from '.'
import { Result as IResult, Pages, AsyncStatus } from '../interfaces'

type Result<T> = IResult<T> & {
  count: number
  ugoira: boolean
  id: string | null
}

const defaultState: Result<Pages> = {
  status: AsyncStatus.Loading,
  value: null,
  count: 0,
  ugoira: false,
  id: null
}

export function usePages(illustId: string) {
  const { client, ac } = useClient()
  const idRef = useRef(illustId)
  const [result, update] = useState<Result<Pages>>(defaultState)
  const internal = useMemo(() => {
    function read(id: string) {
      client.pages.read({ id, ac }).then(
        value => {
          if (id === idRef.current) {
            update(success(id, value))
          }
        },
        error => {
          client.pages.remove({ id, ac })
          if (error.name === 'AbortError') return
          if (id === idRef.current) {
            update(failure(id, error))
          }
        }
      )
    }

    function reload(id: string) {
      client.pages.remove({ id, ac })
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

function success(id: string, value: Pages): Result<Pages> {
  const count = value.length
  const ugoira = value[0].urls.original.includes('ugoira0')

  return { id, status: AsyncStatus.Success, value, count, ugoira }
}

function failure(id: string, error: any): Result<Pages> {
  let value: string
  if (error.json) {
    value = error.json.message
  } else {
    value = error.message
  }
  return { id, status: AsyncStatus.Failure, value, count: 0, ugoira: false }
}
