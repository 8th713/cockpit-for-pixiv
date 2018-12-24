import { useMemo, useEffect, useRef } from 'react'
import { useClient, useStateRef } from '.'
import { success, failure } from './utils'
import { Result, User, AsyncStatus } from '../interfaces'

const defaultState: Result<User> = {
  status: AsyncStatus.Loading,
  value: null
}

export function useUser(userId: string) {
  const { client, ac } = useClient()
  const [result, update, getResult] = useStateRef<Result<User>>(defaultState)
  const idRef = useRef(userId)
  const internal = useMemo(() => {
    function read(id: string) {
      client.user.read({ id, ac }).then(
        value => {
          if (id === idRef.current) {
            update(success(value))
          }
        },
        error => {
          client.user.remove({ id, ac })
          if (error.name === 'AbortError') return
          if (id === idRef.current) {
            update(failure(error))
          }
        }
      )
    }

    function reload(id: string) {
      client.user.remove({ id, ac })
      read(id)
    }

    return { read, reload }
  }, [])
  const actions = useMemo(() => {
    function retry() {
      update(defaultState)
      internal.reload(idRef.current)
    }

    function follow(restrict: boolean = false) {
      const result = getResult()
      if (result.status !== AsyncStatus.Success) return

      const { value } = result
      if (client.isSelf(value.userId)) return

      update(followUser(value))
      client
        .follow(value.userId, restrict)
        .then(
          () => internal.reload(value.userId),
          () => internal.read(value.userId)
        )
    }

    return { retry, follow, isSelf: client.isSelf }
  }, [])

  idRef.current = userId
  useEffect(
    () => {
      if (userId) {
        update(defaultState)
        internal.read(userId)
      }
    },
    [userId]
  )

  return { result, actions }
}

function followUser(user: User): Result<User> {
  return success({
    ...user,
    isFollowed: true
  })
}
