import { BookmarkPost, Tag } from '../../interfaces'

export type State = {
  restrict: boolean
  comment: string
  tags: string
}

export type Column = 'total' | 'name'

export type Direction = '↓' | '↑'

export const toPostData = (state: State): BookmarkPost => ({
  ...state,
  tags: splitTag(state.tags)
})

export const splitTag = (tags: string) =>
  tags
    .trim()
    .split(/[\s\xA0　]+/)
    .filter(t => t.length)

export const toggleTag = (tags: string[], selectedTag: string) => {
  const set = new Set(tags)

  if (set.has(selectedTag)) {
    set.delete(selectedTag)
  } else {
    set.add(selectedTag)
  }
  return [...set].join(' ')
}

export const sortBy = (tagList: Tag[], prop: Column, direction: Direction) => {
  const sorted = [...tagList].sort((a, b) => {
    const v = a[prop]!
    const w = b[prop]!

    if (v < w) return 1
    if (v > w) return -1
    return 0
  })

  return direction === '↓' ? sorted : sorted.reverse()
}

export const getButtonStyle = (active: boolean, direction: Direction) => {
  const color: 'secondary' | undefined = active ? 'secondary' : undefined
  const arrow = active ? direction : ''
  return { color, arrow }
}
