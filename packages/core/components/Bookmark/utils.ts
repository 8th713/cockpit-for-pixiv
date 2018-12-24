import { Tag, Column, Direction } from '../../interfaces'

export function splitTag(tags: string) {
  return tags.trim().split(/[\s\xA0　]+/)
}

export function countTags(tags: string) {
  return splitTag(tags).filter(t => t.length).length
}

export function toggleTag(tags: string, tag: string) {
  const set = new Set(splitTag(tags))

  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  return [...set].join(' ')
}

export function sortBy(tagList: Tag[], prop: Column, direction: Direction) {
  const sorted = [...tagList].sort((a, b) => {
    const v = a[prop]!
    const w = b[prop]!

    if (v < w) {
      return 1
    }
    if (v > w) {
      return -1
    }
    return 0
  })

  return direction === Direction.ASC ? sorted : sorted.reverse()
}
