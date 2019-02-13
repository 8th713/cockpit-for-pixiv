import { useContext } from 'react'
import { ClientContext } from '../contexts'

export function useUser(userId: string) {
  const { useUserCache, followUser, isSelf } = useContext(ClientContext)
  const { read, remove: retry, replace, reload } = useUserCache(userId)

  function follow(restrict: boolean = false) {
    if (isSelf(userId)) return

    const user = read()

    if (!user) return

    replace({ ...user, isFollowed: true })
    followUser(userId, restrict).then(value => {
      if (value) {
        reload()
      } else {
        replace(user)
      }
    })
  }

  return { read, retry, follow, isSelf }
}
