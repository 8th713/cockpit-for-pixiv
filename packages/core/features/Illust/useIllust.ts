import { bookmarkBy, fetchIllust, likeBy } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'

export const useIllust = createCache(fetchIllust, 1)
export { likeBy, bookmarkBy }
export const like = (illust: Pixiv.Illust): Pixiv.Illust => ({
  ...illust,
  likeCount: illust.likeCount + 1,
  likeData: true
})
export const bookmark = (
  illust: Pixiv.Illust,
  restrict: boolean
): Pixiv.Illust => {
  const bookmarkCount = illust.bookmarkData
    ? illust.bookmarkCount
    : illust.bookmarkCount + 1
  const bookmarkData = illust.bookmarkData
    ? illust.bookmarkData
    : { id: '', private: restrict }
  return { ...illust, bookmarkCount, bookmarkData }
}
