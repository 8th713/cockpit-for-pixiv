import type JSZip from 'jszip'
import { getBlob, getExtension, saveAs } from './utils'

declare var unsafeWindow: Window & {
  JSZip: JSZip
}

export async function download(info: Pixiv.IllustInfo, pages: Pixiv.Images) {
  return info.illustType === 2
    ? downloadMovie(info)
    : info.pageCount > 1
    ? downloadComic(info, pages)
    : downloadIllust(info, pages[0])
}

async function downloadIllust(info: Pixiv.IllustInfo, page: Pixiv.Image) {
  const { title, userName } = info
  const url = page.urls.original
  const blob = await getBlob(url)
  const extension = getExtension(url)

  saveAs(blob, `${userName} - ${title}.${extension}`)
}

async function downloadComic(info: Pixiv.IllustInfo, pages: Pixiv.Images) {
  const { title, userName } = info
  const zip = new unsafeWindow.JSZip()

  for (const [index, page] of pages.entries()) {
    const url = page.urls.original
    const extension = getExtension(url)
    const count = String(index).padStart(3, '000')
    const name = `${userName} - ${title}[${count}].${extension}`
    const blob = await getBlob(url)

    zip.file(name, blob)
  }

  const blob = await zip.generateAsync<'blob'>({ type: 'blob' })

  saveAs(blob, `${userName} - ${title}.zip`)
}

async function downloadMovie(info: Pixiv.IllustInfo) {
  const { urls, title, userName } = info
  const zipUrl = urls.original
    .replace('img-original', 'img-zip-ugoira')
    .replace('_ugoira0.jpg', '_ugoira1920x1080.zip')

  const blob = await getBlob(zipUrl)

  saveAs(blob, `${userName} - ${title}.zip`)
}
