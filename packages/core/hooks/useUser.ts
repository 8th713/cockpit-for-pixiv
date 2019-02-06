import wretch from 'wretch'
import { useCallback } from 'react'
import { createCacheHook } from './useCache'
import { User } from '../interfaces'
import { pixivGlobalData } from '../externals/pixivGlobalData'

const useCache = createCacheHook(fetchUser)

export function useUser(userId: string) {
  const { read, remove: retry, replace, reload, abortable, signal } = useCache(userId)
  const isSelf = pixivGlobalData.userId === userId
  const follow = useCallback(
    (restrict: boolean = false) => {
      if (isSelf) return
      const user = read()

      if (!user) return

      replace({ ...user, isFollowed: true })
      abortable(followUser(userId, restrict))
        .then(reload)
        .catch(error => {
          if (signal.aborted) return
          throw error
        })
    },
    [userId]
  )

  return { read, retry, follow, isSelf }
}

/**
 * ユーザー情報
 *
 * GET /ajax/user/:userId
 * @param {string} userId ユーザー識別子
 */
function fetchUser(userId: string) {
  return wretch(`/ajax/user/${userId}`)
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')
    .get()
    .json<User>(data => data.body)
    .catch(error => {
      console.error(error)
      return null
    })
}

/**
 * フォロー
 * POST /bookmark_add.php
 *
 * Content-Type: application/x-www-form-urlencoded; charset=utf-8
 * @param {'add'} mode リクエストモード
 * @param {'user'} type リクエストタイプ
 * @param {string} user_id ユーザー識別子
 * @param {0|1} restrict 0=公開/1=非公開
 * @param {'json'} format フォーマットタイプ
 * @param {string} tt トークン
 */
function followUser(userId: string, restrict: boolean) {
  return wretch('/bookmark_add.php')
    .headers({ 'x-csrf-token': pixivGlobalData.token })
    .formUrl({
      mode: 'add',
      type: 'user',
      user_id: userId,
      tag: '',
      restrict: restrict ? 1 : 0,
      format: 'json'
    })
    .post()
    .json<never[]>()
}
