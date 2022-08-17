import ky from 'ky'
import { createPool } from './threadPool'

type EOCD = [count: number, offset: number, size: number]
// type EOCD = [number, number, number]
interface Entry {
  name: string
  size: number
  begin: number
}

const pool = createPool(10)

export const loadZip = async (
  ugoira: Pixiv.Ugoira
): Promise<Pixiv.FrameAndImage[]> => {
  const { originalSrc, frames } = ugoira
  const buffer = await ky
    .get(originalSrc, {
      credentials: 'same-origin',
      cache: 'force-cache',
      retry: 1,
    })
    .arrayBuffer()
  const eocd = getEOCD(buffer)
  const entries = getEntries(buffer, eocd)

  return Promise.all(
    entries.map((entry, i) =>
      pool.execute(async () => {
        const frame = frames[i]
        const image = await getImage(buffer, entry, ugoira.mime_type)
        return { ...frame, image }
      })
    )
  )
}

const getEOCD = (buffer: ArrayBuffer): EOCD => {
  const length = buffer.byteLength
  const view = new DataView(buffer, length - 22, 22)

  if (view.getUint32(0, true) !== 0x06054b50)
    throw new Error('End of Central Directory signature not found')

  const cdCount = view.getUint16(10, true) // セントラルディレクトリレコードの合計数
  const cdSize = view.getUint32(12, true) // セントラルディレクトリのサイズ (バイト)
  const cdOffset = view.getUint32(16, true) // セントラルディレクトリの開始位置のオフセット

  return [cdCount, cdOffset, cdSize]
}

const getEntries = (buffer: ArrayBuffer, [count, offset, size]: EOCD) => {
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
      throw new Error(`インデックス ${i} のエントリが取得できませんでした`)
    }
  }
  return entries
}

const getImage = (buffer: ArrayBuffer, entry: Entry, type: string) => {
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

    img.src = src
    img.decode().then(
      () => {
        URL.revokeObjectURL(src)
        resolve(img)
      },
      () => {
        URL.revokeObjectURL(src)
        reject(img)
      }
    )
  })
}
