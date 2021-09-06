declare namespace Pixiv {
  /** ブックマーク用フォームデータ */
  interface BookmarkFormState {
    /** コメントフィールドの値 */
    comment: string
    /** 公開状態 */
    restrict: boolean
    /** タグフィールドの値 */
    tags: string
  }

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

declare var pixiv: {
  context: {
    token: string
  }
  user: {
    id: string
  }
}

declare var globalInitData: {
  token: string
  userData: {
    id: string
  }
}
