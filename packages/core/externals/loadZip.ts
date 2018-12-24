import wretch, { Wretcher } from 'wretch'
import { Ugoira, Frame } from '../interfaces'
import { createPool } from './threadPool'

type EOCD = [number, number, number]
interface Entry {
  name: string
  size: number
  begin: number
}

const pool = createPool(3)

export async function loadZip(
  ugoira: Ugoira,
  ac: AbortController
): Promise<Frame[]> {
  const client = wretch(ugoira.originalSrc, {
    credentials: 'same-origin'
  }).signal(ac)
  const length = await getSize(client)
  const eocd = await getEOCD(client, length)
  const entries = await getEntries(client, eocd)

  return Promise.all(
    entries.map(entry =>
      pool.execute(() => getSrc(client, entry, ugoira.mime_type))
    )
  ).then(images =>
    ugoira.frames.map((frame, i) => ({ ...frame, image: images[i] }))
  )
}

function fetchRange(client: Wretcher, begin: number, end: number) {
  return client
    .headers({ Range: `bytes=${begin}-${end - 1}` })
    .get()
    .arrayBuffer()
}
async function getSize(client: Wretcher) {
  try {
    const size = await client
      .head()
      .res(response => Number(response.headers.get('Content-Length') || 0))

    return size
  } catch {
    throw new Error('zip ファイルのサイズ取得に失敗')
  }
}
async function getEOCD(client: Wretcher, length: number): Promise<EOCD> {
  const begin = length - 30000

  try {
    const eocd = await fetchRange(client, begin, length)
    const view = new DataView(eocd, eocd.byteLength - 22, 22)

    if (view.getUint32(0, true) !== 0x06054b50) {
      throw new Error('End of Central Directory signature not found')
    }
    const cdCount = view.getUint16(10, true) // セントラルディレクトリレコードの合計数
    const cdSize = view.getUint32(12, true) // セントラルディレクトリのサイズ (バイト)
    const cdOffset = view.getUint32(16, true) // セントラルディレクトリの開始位置のオフセット

    return [cdCount, cdSize, cdOffset]
  } catch {
    throw new Error('EOCD 取得に失敗')
  }
}
async function getEntries(
  client: Wretcher,
  [count, size, offset]: [number, number, number]
) {
  try {
    const chunk = await fetchRange(client, offset, offset + size)
    const view = new DataView(chunk)
    const entries: Array<Entry> = []
    let p = 0

    for (var i = 0; i < count; i++) {
      if (view.getUint32(p, true) === 0x02014b50) {
        const length = view.getUint32(p + 24, true) // 非圧縮サイズ
        const begin = view.getUint32(p + 42, true) // ローカルファイルヘッダの相対オフセット
        const extraLength = view.getUint16(p + 30, true) // 拡張フィールドの長さ
        const cmtLength = view.getUint16(p + 32, true) // ファイルコメントの長さ
        const nameLength = view.getUint16(p + 28, true) // ファイル名の長さ
        const nameView = new Uint8Array(chunk, p + 46, nameLength)
        const name = String.fromCharCode(...nameView)
        const size = length + nameLength + extraLength + 30

        entries.push({ name, size, begin })
        p += nameLength + extraLength + cmtLength + 46
      } else {
        console.error(`インデックス ${i} のエントリが取得できませんでした`)
        throw new Error(`インデックス ${i} のエントリが取得できませんでした`)
      }
    }
    return entries
  } catch {
    throw new Error('セントラルディレクトリエントリ取得に失敗')
  }
}
async function getSrc(client: Wretcher, entry: Entry, type: string) {
  try {
    const chunk = await fetchRange(
      client,
      entry.begin,
      entry.begin + entry.size
    )
    const view = new DataView(chunk)
    const nameLength = view.getUint16(26, true)
    const extraLength = view.getUint16(28, true)
    const begin = nameLength + extraLength + 30
    const blob = new Blob([chunk.slice(begin)], { type })
    const src = URL.createObjectURL(blob)
    const img = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()

      img.addEventListener('load', () => {
        URL.revokeObjectURL(src)
        resolve(img)
      })
      img.addEventListener('error', () => {
        URL.revokeObjectURL(src)
        reject(img)
      })
      img.src = src
    })

    return img
  } catch (error) {
    if (error instanceof Image) {
      throw new Error('blob URL が不正です')
    }
    throw new Error(
      `zip 内ファイルの取得に失敗 ${entry.name}: ${entry.begin}-${entry.begin +
        entry.size}`
    )
  }
}
