const WIDTH = 700
const HEIGHT = 472

export const openTwitter = ({ id, title, userName }: Pixiv.Illust) => {
  const text = `${title} | ${userName} #pixiv`
  const link = `https://www.pixiv.net/artworks/${id}`
  const url = createUrl(text, link)
  const options = normalizeOption(calcRect(WIDTH, HEIGHT))

  window.open(url, '', options)
}
const createUrl = (text: string, link: string) => {
  const url = new URL('https://twitter.com/intent/tweet')

  url.searchParams.set('text', text)
  url.searchParams.set('url', link)
  return url.toString()
}
const getCenterPoint = () => ({
  left: window.screen.width / 2,
  top: window.screen.height / 2
})
const calcRect = (width: number, height: number) => {
  const center = getCenterPoint()
  const left = Math.round(center.left - width / 2)
  const top = Math.max(0, Math.round(center.top - height / 2) - 40)

  return {
    top,
    left,
    width,
    height
  }
}
const normalizeOption = (options: {
  top: number
  left: number
  width: number
  height: number
}) =>
  Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join()
