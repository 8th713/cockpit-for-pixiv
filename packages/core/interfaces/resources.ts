/**
 * ユーザー
 *
 * GET /ajax/user/:userId
 * @param {string} userId ユーザー識別子
 */
export interface User {
  // アバター
  image: string
  // フォローしているか
  isFollowed: boolean
  // ユーザー名
  name: string
  // ユーザー識別子
  userId: string
}

/**
 * ユーザープロフィール
 *
 * GET /ajax/user/:userId/profile/top
 * @param {string} userId ユーザー識別子
 */
export interface RelatedImages {
  bookmarkData: Illust['bookmarkData']
  description: Illust['description']
  height: Illust['height']
  id: Illust['id']
  illustType: Illust['illustType']
  isBookmarkable: Illust['isBookmarkable']
  pageCount: Illust['pageCount']
  restrict: Illust['restrict']
  // ???
  sl: number
  // シンプルタグリスト
  tags: string[]
  title: Illust['title']
  // 250x250 square1200
  url: string
  userId: Illust['userId']
  userName: Illust['userName']
  width: Illust['width']
  xRestrict: Illust['xRestrict']
}
export interface Profile {
  extraData: {
    meta: {
      // https://www.pixiv.net/member.php?id=:userId
      canonical: string
      // 紹介文
      description: string
      // キーワード
      keywords: string
    }
  }
  illusts: {
    [illustId: string]: RelatedImages
  }
  manga: {
    [illustId: string]: RelatedImages
  }
}
export interface FormatedProfile {
  canonical: string
  description: string
  illusts: RelatedImages[]
  keywords: string
}

/**
 * 作品
 *
 * GET /ajax/illust/:illustId
 * @param {string} illustId イラスト識別子
 */
export interface Illust {
  // ブックマーク数
  bookmarkCount: number
  // ブックマークデータ
  bookmarkData: null | {
    // ブックマーク識別子
    id: string
    // ブックマークの公開状態
    private: boolean
  }
  // pixiv comic 連動
  comicPromotion: null | {}
  // コメント数
  commentCount: number
  // コンテスト関連
  contestBanners: any[]
  // ISOString 投稿日
  createDate: string
  // キャプション
  description: string
  // Booth 関連
  descriptionBoothId: null
  // ファクトリー関連
  factoryGoods: {
    integratable: boolean
    integrated: boolean
  }
  // 高さ[一枚目のみ]
  height: number
  // 投稿識別子
  id: string
  // キャプション
  illustComment: string
  // 投稿識別子
  illustId: string
  illustSeries?: {
    title: string // シリーズタイトル
    url: string // シリーズ URL
  }
  // 投稿タイトル
  illustTitle: string
  // イラストの種類[画像,漫画,動画]
  illustType: 0 | 1 | 2
  // イメージレスポンス数
  imageResponseCount: number
  imageResponseData: any[]
  imageResponseOutData: any[]
  // ブックマーク可能か
  isBookmarkable: boolean
  // ハウツーか?
  isHowto: boolean
  // オリジナルか?
  isOriginal: boolean
  // いいね数
  likeCount: number
  // いいね状態
  likeData: boolean
  // 枚数
  pageCount: number
  // アンケート
  pollData: null | {
    // 選択肢
    choices: {
      [index: number]: {
        count: number // 回答数
        id: number // 回答識別子
        text: string // 内容
      }
    }
    // 質問
    question: string
    // 回答id
    selectedValue: null | number
    // 総回答数
    total: number
  }
  // レスポンス数
  responseCount: number
  // 公開範囲[公開,マイピク,非公開]
  restrict: 0 | 1 | 2
  // シリーズナビゲーション
  seriesNavData: null | {
    // 次の投稿
    next: null | {
      // 投稿識別子
      illustId: string
      // 話数
      order: number
      // 作品名
      title: string
    }
    // 話数
    order: number
    // 前の投稿
    prev: null | {
      // 投稿識別子
      illustId: string
      // 話数
      order: number
      // 作品名
      title: string
    }
    // シリーズ識別子
    seriesId: string
    // シリーズタイトル
    title: string
  }
  // タグに関連? 謎ハッシュ
  storableTags: string[]
  // タグ情報
  tags: {
    // 投稿者識別子
    authorId: string
    // タグロック状態
    isLocked: boolean
    // タグリスト
    tags: Array<{
      // タグ名
      tag: string
      // ロック
      locked: boolean
      // 削除可能か
      deletable: boolean
      // よみがな(ローマ字)
      romaji: string | null
      // 多言語
      translation?: {
        [locale: string]: string
      }
      // タグを付けた人のID
      userId?: string
      // タグを付けた人の名前
      userName?: string
    }>
    // タグを追加できるか
    writable: boolean
  }
  title: string
  // ISOString 更新日
  uploadDate: string
  // 画像URL
  urls: {
    mini: string // 48x
    thumb: string // 240x
    small: string // 540x
    regular: string // 1200x
    original: string // オリジナル
  }
  // 投稿者アカウント名
  userAccount: string
  // 投稿者識別子
  userId: string
  // 投稿者の投稿一覧
  userIllusts: {
    [illustId: string]: null | Illust
  }
  // 投稿者ハンドル名
  userName: string
  // 閲覧数
  viewCount: number
  // 幅[一枚目のみ]
  width: number
  // 18禁[規制内,R-18,R-18G]
  xRestrict: 0 | 1 | 2
  // 不明
  zoneConfig: {}
}

/**
 * 画像情報
 *
 * GET /ajax/illust/:illustId/pages
 *
 * @param {string} illustId イラスト識別子
 */
export interface Page {
  // 画像の高さ
  height: number
  // 画像のURL
  urls: {
    original: string // オリジナル
    regular: string // 1200x
    small: string // 540x
  }
  // 画像の幅
  width: number
}
export type Pages = Array<Page>

/**
 * うごイラ情報
 *
 * GET /ajax/illust/:illustId/ugoira_meta
 * @param {string} illustId イラスト識別子
 */
export interface Ugoira {
  // フレームリスト
  frames: Array<{
    delay: number
    file: string
  }>
  // MIME
  mime_type: string
  // オリジナル zip
  originalSrc: string
  // 600x zip
  src: string
}

/**
 * ブックマークフォーム
 *
 * GET /bookmark_add.php
 * @param {'illust'} type リクエストタイプ
 * @param {string} illust_id イラスト識別子
 */
export interface BookmarkForm {
  comment: string
  tags: string
  restrict: 0 | 1
  userTags: {
    name: string
    lev: number
    total: number
  }[]
}

/**
 * アカウントタグリスト
 *
 * GET /rpc/illust_bookmark_tags.php
 * @param {'lev,total'} attributes 要求属性名リスト
 * @param {string} tt トークン
 */
export interface AccountTagList {
  [tagName: string]: {
    // タグレベル[1-6]
    lev: number
    // 使用回数
    total: number
  }
}

/**
 * いいね！
 *
 * POST /ajax/illusts/like
 * @param {string} illsut_id イラスト識別子
 */
export interface LikeData {
  is_liked: boolean
}

/**
 * ブックマーク
 *
 * POST /ajax/illusts/bookmarks/add
 * @param {string} illust_id イラスト識別子
 * @param {number} restrict 0=公開/1=非公開
 * @param {stirng} comment コメント
 * @param {string[]} tags タグリスト
 */
export interface BookmarkData {
  // ブックマーク識別子
  last_bookmark_id: string
  // 不明
  stacc_status_id: null | string
}
