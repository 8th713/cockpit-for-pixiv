import { useCallback, useContext } from 'react'
import { ClientContext } from '../contexts'

export function useUser(userId: string) {
  const { useUserCache, followUser, isSelf } = useContext(ClientContext)
  const { read, remove: retry, replace, reload } = useUserCache(userId)
  const follow = useCallback(
    (restrict: boolean = false) => {
      if (isSelf(userId)) return

      const user = read()

      if (!user) return

      replace({ ...user, isFollowed: true })
      followUser(userId, restrict).then(() => reload(), () => replace(user))
    },
    [userId]
  )

  return { read, retry, follow, isSelf }
}
