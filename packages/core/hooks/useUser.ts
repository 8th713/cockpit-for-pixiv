import { useContext } from 'react'
import { ClientContext } from '../contexts'

export function useUser(userId: string) {
  const { useUserCache, followUser, isSelf } = useContext(ClientContext)
  const { read, replace, reload: retry } = useUserCache(userId)

  function follow(restrict: boolean = false) {
    if (isSelf(userId)) return

    const user = read()

    if (!user) return

    replace({ ...user, isFollowed: true })
    followUser(userId, restrict).then(value => {
      if (value) {
        retry()
      } else {
        replace(user)
      }
    })
  }

  return { read, retry, follow, isSelf }
}
