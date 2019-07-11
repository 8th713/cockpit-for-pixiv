import { Illust, KeyDefinition } from '../../interfaces'

export function getTitle(props: KeyDefinition) {
  return `${props.children}(${props.keyName.toUpperCase()})`
}

export function like(illust: Illust): Illust {
  const likeCount = illust.likeCount + 1
  return { ...illust, likeCount, likeData: true }
}

export function bookmark(illust: Illust, restrict: boolean): Illust {
  const bookmarkCount = illust.bookmarkData
    ? illust.bookmarkCount
    : illust.bookmarkCount + 1
  const bookmarkData = illust.bookmarkData
    ? illust.bookmarkData
    : { id: '', private: restrict }
  return { ...illust, bookmarkCount, bookmarkData }
}