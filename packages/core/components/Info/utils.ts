export function like(illust: Pixiv.Illust): Pixiv.Illust {
  const likeCount = illust.likeCount + 1
  return { ...illust, likeCount, likeData: true }
}

export function bookmark(
  illust: Pixiv.Illust,
  restrict: boolean
): Pixiv.Illust {
  const bookmarkCount = illust.bookmarkData
    ? illust.bookmarkCount
    : illust.bookmarkCount + 1
  const bookmarkData = illust.bookmarkData
    ? illust.bookmarkData
    : { id: '', private: restrict }
  return { ...illust, bookmarkCount, bookmarkData }
}
