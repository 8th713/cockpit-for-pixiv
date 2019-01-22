import wretch from 'wretch'
import { createCacheHook } from './useCache'
import { BookmarkForm } from '../interfaces'

const useCache = createCacheHook(fetchBookmarkForm)

export function useBookmarkForm(illustId: string) {
  const { read, remove: retry } = useCache(illustId)

  return { read, retry }
}

/**
 * ブックマークフォーム
 *
 * GET /bookmark_add.php
 * @param {'illust'} type リクエストタイプ
 * @param {string} illust_id イラスト識別子
 */
function fetchBookmarkForm(illustId: string) {
  return wretch('/bookmark_add.php')
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')
    .query({ type: 'illust', illust_id: illustId })
    .get()
    .text(parseFormHTML)
}
function parseFormHTML(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const form = doc.querySelector<HTMLFormElement>(
    'form[action^="bookmark_add.php"]'
  )!
  const data = new FormData(form)
  const res: BookmarkForm = {
    comment: '',
    tags: '',
    restrict: 0
  }

  for (const [name, value] of data.entries()) {
    if (name === 'comment') {
      res.comment = value as string
    } else if (name === 'tag') {
      res.tags = value as string
    } else if (name === 'restrict') {
      res.restrict = Number(value) as 0 | 1
    }
  }
  return res
}
