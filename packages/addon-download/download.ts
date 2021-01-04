import { getBlob, getExtension, saveAs } from './utils'

export const download = async (work: Pixiv.Illust, pages: Pixiv.Pages) => {
  return work.illustType === 2
    ? downloadUgoira(work)
    : work.pageCount > 1
    ? downloadComic(work, pages)
    : downloadIllust(work, pages[0])
}

const downloadIllust = async (illust: Pixiv.Illust, page: Pixiv.Page) => {
  const { title, userName } = illust
  const url = page.urls.original
  const blob = await getBlob(url)
  const extension = getExtension(url)
  saveAs(blob, `${userName} - ${title}.${extension}`)
}

const downloadComic = async (illust: Pixiv.Illust, pages: Pixiv.Pages) => {
  const { title, userName } = illust
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

const downloadUgoira = async (illust: Pixiv.Illust) => {
  const { urls, title, userName } = illust
  const zipUrl = urls.original
    .replace('img-original', 'img-zip-ugoira')
    .replace('_ugoira0.jpg', '_ugoira1920x1080.zip')

  const blob = await getBlob(zipUrl)
  saveAs(blob, `${userName} - ${title}.zip`)
}
