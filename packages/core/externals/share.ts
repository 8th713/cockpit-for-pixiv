import { Illust } from '../interfaces'

function createUrl(text: string, link: string) {
  const url = new URL('https://twitter.com/intent/tweet')

  url.searchParams.set('text', text)
  url.searchParams.set('url', link)
  return url.toString()
}

function getCenterPoint() {
  return {
    left: window.screen.width / 2,
    top: window.screen.height / 2
  }
}

function calcRect(width: number, height: number) {
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

function normalizeOption(options: {
  top: number
  left: number
  width: number
  height: number
}) {
  return Object.keys(options)
    .map(key => {
      const value = options[key]

      return `${key}=${value}`
    })
    .join()
}

const WIDTH = 700
const HEIGHT = 472

export function openTwitter({ id, title, userName }: Illust) {
  const text = `${title} | ${userName} #pixiv`
  const link = `https://www.pixiv.net/member_illust.php?mode=medium&illust_id=${id}`
  const url = createUrl(text, link)
  const options = normalizeOption(calcRect(WIDTH, HEIGHT))

  window.open(url, '', options)
}
