import wretch from 'wretch'
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

  const response = await client.get().res()
  const length = Number(response.headers.get('content-length'))
  const buffer = await response.arrayBuffer()
  const eocd = getEOCD(buffer, length)
  const entries = getEntries(buffer, eocd)

  return Promise.all(
    entries.map(entry =>
      pool.execute(() => getSrc(buffer, entry, ugoira.mime_type))
    )
  ).then(images =>
    ugoira.frames.map((frame, i) => ({ ...frame, image: images[i] }))
  )
}
function getEOCD(buffer: ArrayBuffer, length: number): EOCD {
  const view = new DataView(buffer, length - 22, 22)

  if (view.getUint32(0, true) !== 0x06054b50) {
    throw new Error('End of Central Directory signature not found')
  }
  const cdCount = view.getUint16(10, true) // セントラルディレクトリレコードの合計数
  const cdSize = view.getUint32(12, true) // セントラルディレクトリのサイズ (バイト)
  const cdOffset = view.getUint32(16, true) // セントラルディレクトリの開始位置のオフセット

  return [cdCount, cdOffset, cdSize]
}
function getEntries(buffer: ArrayBuffer, [count, offset, size]: EOCD) {
  const view = new DataView(buffer, offset, size)
  const entries: Array<Entry> = []
  let p = 0

  for (var i = 0; i < count; i++) {
    if (view.getUint32(p, true) === 0x02014b50) {
      const length = view.getUint32(p + 24, true) // 非圧縮サイズ
      const begin = view.getUint32(p + 42, true) // ローカルファイルヘッダの相対オフセット
      const extraLength = view.getUint16(p + 30, true) // 拡張フィールドの長さ
      const cmtLength = view.getUint16(p + 32, true) // ファイルコメントの長さ
      const nameLength = view.getUint16(p + 28, true) // ファイル名の長さ
      const nameView = new Uint8Array(buffer, offset + p + 46, nameLength)
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
}
function getSrc(buffer: ArrayBuffer, entry: Entry, type: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const view = new DataView(buffer, entry.begin, entry.size)
    const length = view.getUint32(22, true) // 非圧縮サイズ
    const nameLength = view.getUint16(26, true) // ファイル名の長さ (n)
    const extraLength = view.getUint16(28, true) // 拡張フィールドの長さ (m)
    const begin = entry.begin + nameLength + extraLength + 30
    const end = begin + length
    const blob = new Blob([buffer.slice(begin, end)], { type })
    const src = URL.createObjectURL(blob)
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
}
