export function toggleTag(list: string[], tag: string) {
  const tagSet = new Set(list)

  if (tagSet.has(tag)) {
    tagSet.delete(tag)
  } else {
    tagSet.add(tag)
  }
  return [...tagSet].join(' ')
}
