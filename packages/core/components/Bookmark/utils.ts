import { ButtonProps } from '../shared'

export type State = {
  restrict: boolean
  comment: string
  tags: string
}

export type Column = 'total' | 'name'

export type Direction = '↓' | '↑'

export const toPostData = (state: State): Pixiv.BookmarkPost => ({
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

export const sortBy = (
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

export const getButtonStyle = (active: boolean, direction: Direction) => {
  const color: ButtonProps['colors'] = active ? 'primary' : undefined
  const arrow = active ? direction : ''
  return { color, arrow }
}
