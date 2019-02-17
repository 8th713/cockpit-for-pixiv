import { Illust } from '../core/interfaces'
import { fetchPages, fetchUgoira } from './fetcher'
import { getBlob, getExtension, saveAs } from './utils'

export function download(illust: Illust) {
  // うごイラ
  if (illust.illustType === 2) {
    return downloadUgoira(illust)
  }
  // 漫画
  if (illust.pageCount > 1) {
    return downloadComic(illust)
  }
  // イラスト
  return downloadSingle(illust)
}

async function downloadSingle(illust: Illust) {
  const { id, title, userName } = illust
  const [page] = await fetchPages(id)
  const url = page.urls.original
  const blob = await getBlob(url)
  const extension = getExtension(url)
  saveAs(blob, `${userName} - ${title}.${extension}`)
}

async function downloadComic(illust: Illust) {
  const { id, title, userName } = illust
  const pages = await fetchPages(id)
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

async function downloadUgoira(illust: Illust) {
  const { id, title, userName } = illust
  const data = await fetchUgoira(id)
  const blob = await getBlob(data.originalSrc)
  saveAs(blob, `${userName} - ${title}.zip`)
}
