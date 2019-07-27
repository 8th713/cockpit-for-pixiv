declare namespace Pixiv {
  /** アカウントタグリスト */
  interface AccountTagList {
    [tagName: string]: {
      /** タグレベル 1-6 */
      lev: number
      /** 使用回数 */
      total: number
    }
  }

  /** GET /bookmark_add.php?type=illust&illust_id=illustId */
  interface BookmarkForm {
    /** コメントフィールドの値 */
    comment: string
    /** 公開状態 */
    restrict: boolean
    /** タグフィールドの値 */
    tags: string
    /** 過去に使用したことのあるタグ一覧 */
    userTags: UserTag[]
  }

  /** Zip loader Result */
  interface FrameAndImage extends Frame {
    /** Blob URL */
    image: HTMLImageElement
  }

  /** 最近の投稿一覧 */
  type RelatedIllusts = SimpleIllust[]

  /** 過去に使用したことのあるタグ */
  interface UserTag {
    /** タグ名 */
    name: string
    /** タグレベル 1-6 */
    lev: number
    /** 使用回数 */
    total: number
  }
}
