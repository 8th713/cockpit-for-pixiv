declare namespace Pixiv {
  /** ブックマーク用ポストデータ */
  interface BookmarkPost {
    restrict?: boolean
    comment?: string
    tags?: string[]
  }

  /** ログイン情報 */
  interface GlobalData {
    token: string
    userId: string
  }
}
