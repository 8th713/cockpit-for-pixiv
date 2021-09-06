// フォーマット済みレスポンス
declare namespace Pixiv {
  /** アカウントタグリスト */
  interface AccountTagList {
    [tagName: string]: {
      /** タグレベル 1-6 */
      lev: number
      /** 使用回数 */
      total: number
      /** 使用回数 */
      show: string
    }
  }

  /** Response of `GET /bookmark_add.php?type=illust&illust_id=illustId` */
  interface BookmarkState {
    /** コメントフィールドの値 */
    comment: string
    /** 公開状態 */
    restrict: boolean
    /** タグフィールドの値 */
    tags: string
    /** 過去に使用したことのあるタグ一覧 */
    userTags: MyTag[]
  }

  /** Zip loader Result */
  interface FrameAndImage extends Frame {
    /** Blob URL */
    image: HTMLImageElement
  }

  /** 最近の投稿一覧 */
  type RecentIllusts = SimpleIllust[]

  /** 過去に使用したことのあるタグ */
  interface MyTag {
    /** タグ名 */
    name: string
    /** タグレベル 1-6 */
    lev: number
    /** 使用回数 */
    total: number
    /** 使用回数 */
    show: string
  }
}
