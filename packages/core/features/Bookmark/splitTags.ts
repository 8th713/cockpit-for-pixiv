export function splitTags(tags: string) {
  return tags
    .trim()
    .split(/[\s\xA0　]+/)
    .filter((t) => t.length)
}
