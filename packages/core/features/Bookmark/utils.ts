export type Column = 'total' | 'name'
export type Direction = '↓' | '↑'
export const COMMENT_MAX = 140
export const TAGS_MAX = 10
export const splitTags = (tags: string) =>
  tags
    .trim()
    .split(/[\s\xA0　]+/)
    .filter(t => t.length)
export const validate = ({ comment, tags }: Required<Pixiv.BookmarkPost>) => {
  if (tags.length > TAGS_MAX) return false
  if (comment.length > COMMENT_MAX) return false
  return true
}

export const toggleTag = (list: string[], tag: string) => {
  const set = new Set(list)

  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  return [...set].join(' ')
}
export const sort = (
  tagList: Pixiv.UserTag[],
  prop: Column,
  direction: Direction
) => {
  const sorted = [...tagList].sort((a, b) => {
    const v = a[prop]!
    const w = b[prop]!

    if (v < w) return 1
    if (v > w) return -1
    return 0
  })

  return direction === '↓' ? sorted : sorted.reverse()
}
