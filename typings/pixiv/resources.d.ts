declare namespace Pixiv {
  /**
   * プロフィール背景
   * - User.background
   */
  interface Background {
    color: null
    isPrivate: boolean
    repeat: null
    /** ヘッダー画像 1920x960 */
    url: string
  }

  /**
   * 誕生日
   * - User.birthDay
   */
  interface BirthDay {
    /** m月d日 */
    name: string | null
    /** 公開範囲 */
    privacyLevel: RestrictString | null
  }

  /**
   * ブックマークデータ
   * - Illust.bookmarkData
   * - IllustSimple.bookmarkData
   */
  interface BookmarkData {
    /** ブックマークの Id */
    id: string
    /** 非公開か? */
    private: boolean
  }

  /** POST /ajax/illusts/bookmarks/add */
  interface BookmarkValue {
    /** ブックマークの Id */
    last_bookmark_id: string
    /** 不明 */
    stacc_status_id: null | string
  }

  /**
   * 投票の選択肢
   * - Illust.pollData.choices[n]
   */
  interface Choice {
    /** 選んだ人の数 */
    count: number
    /** 回答の Id */
    id: number
    /** 内容 */
    text: string
  }

  /**
   * 関連書籍プロモーション
   * - Illust.comicPromotion
   */
  interface ComicPromotion {
    /** Amazon URL */
    amazonUrl: string
    /** 著者名 illust.userName と一致しない場合あり */
    author: string
    /** 本の説明 */
    description: string
    /** 本のサムネイル */
    imgSrc: string
    /** 掲載誌の名前 */
    magazine: string
    /** 掲載誌 URL */
    magazineUrl: string
    /** 作品名 */
    title: string
    /** illust.userId alias */
    userId: string
    /** 掲載ページ URL */
    workUrl: string
  }

  /**
   * 参加コンテスト情報
   * - Illust.contestData
   */
  interface ContestData {
    /** コンテストのアイコン */
    icon: string
    /** コンテストの名前 */
    title: string
    /** コンテストの URL */
    url: string
  }

  /**
   * 追加情報
   * - Illust.extraData
   * - Profile.extraData
   */
  interface ExtraData {
    /** ヘッダタグ内の情報 */
    meta: Meta
  }

  /**
   * 不明
   * - Illust.factoryGoods
   */
  interface FactoryGoods {
    integratable: boolean
    integrated: boolean
  }

  /**
   * フレーム情報
   * - Ugoira.frames
   * */
  interface Frame {
    /** 表示時間 ms */
    delay: number
    /** ファイル名 */
    file: string
  }

  /**
   * 性別
   * - User.gender
   */
  interface Gender {
    /** 男性 | 女性 */
    name: string | null
    /** 公開範囲 */
    privacyLevel: RestrictString | null
  }

  /** GET /ajax/illust/:illustId */
  interface Illust {
    /** ブックマークされた回数 */
    bookmarkCount: number
    /** ブックマークデータ */
    bookmarkData: BookmarkData | null
    /** 関連書籍プロモーション */
    comicPromotion: ComicPromotion | null
    /** コメントされた回数 */
    commentCount: number
    /** 開催コンテスト情報 */
    contestBanners: never[]
    /** 参加コンテスト情報 */
    contestData: ContestData | null
    /** 投稿日 ISOString */
    createDate: string
    /** イラストのコメント */
    description: string
    /** Booth Id */
    descriptionBoothId: number | null
    /** YouTube Id https://www.youtube.com/watch?v=:descriptionYoutubeId */
    descriptionYoutubeId: string | null
    /** 追加情報 */
    extraData: ExtraData
    /** 不明 */
    factoryGoods: FactoryGoods
    /** 一枚目の画像の高さ */
    height: number
    /** イラストの Id */
    id: string
    /** description alias */
    illustComment: string
    /** id alias */
    illustId: string
    /** イラストのタイトル */
    illustTitle: string
    /** イラストの種類 */
    illustType: IllustType
    /** イメージレスポンス数 */
    imageResponseCount: number
    /** イメージレスポンス一覧 */
    imageResponseData: ImageResponse[]
    /** イメージレスポンスのなにか */
    imageResponseOutData: any[]
    /** ブックマーク可能か? */
    isBookmarkable: boolean
    /** ハウツーか? */
    isHowto: boolean
    /** オリジナルか? */
    isOriginal: boolean
    /** いいね！された回数 */
    likeCount: number
    /** いいね！の状態 */
    likeData: boolean
    /** 投稿に含まれる画像の枚数 */
    pageCount: number
    /** 投票 */
    pollData: Poll | null
    /** コメントの返信数 */
    responseCount: number
    /** 公開範囲 */
    restrict: Restrict
    /** シリーズ情報 */
    seriesNavData: Series | null
    /** 不明 */
    sl: number
    /** おそらくタグのユニークキーのリスト */
    storableTags: string[]
    /** タグ一覧詳細 */
    tags: IllustTags
    /** illustTitle alias */
    title: string
    /** 更新日 ISOString */
    uploadDate: string
    /** サムネイルの URL セット */
    urls: IllustUrls
    /** 投稿者ログイン名 */
    userAccount: string
    /** 投稿者 Id */
    userId: string
    /** 投稿者の最近の投稿一覧 */
    userIllusts: {
      [illustId: string]: SimpleIllust | null
    }
    /** 投稿者表示名 */
    userName: string
    /** 閲覧数 */
    viewCount: number
    /** 一枚目の画像の幅 */
    width: number
    /** 表現範囲 */
    xRestrict: XRestrict
    /** ads 関連 */
    zoneConfig: any
  }

  /**
   * タグ
   * - Illust.tags.tag[n]
   */
  interface IllustTag {
    /** タグ名 */
    tag: string
    /** ロックされているか? */
    locked: boolean
    /** 削除可能か? */
    deletable: boolean
    /** よみがな(ローマ字) */
    romaji: string | null
    /** 翻訳 */
    translation?: Translation
    /** タグを付けた人の Id */
    userId?: string
    /** タグを付けた人の名前 */
    userName?: string
  }

  /**
   * タグ一覧詳細
   * - Illust.tags
   */
  interface IllustTags {
    /** illust.userId alias */
    authorId: string
    /** タグロックされているか? */
    isLocked: boolean
    /** タグ一覧 */
    tags: IllustTag[]
    /** タグを追加できるか? */
    writable: boolean
  }

  /**
   * イラストの種類 { 0=画像, 1=漫画, 2=動画 }
   * - Illust.illustType
   * - IllustSimple.illustType
   * - ImageResponse.illustType
   * */
  type IllustType = 0 | 1 | 2

  /**
   * サムネイルの URL セット
   * - Illust.urls
   */
  interface IllustUrls {
    /** 48x48 suffix: square1200 */
    mini: string
    /** 250x250 suffix: square1200 */
    thumb: string
    /** 540x540 suffix: master1200 */
    small: string
    /** 1200x1200 suffix: master1200 */
    regular: string
    /** オリジナル */
    original: string
  }

  /**
   * イメージレスポンス
   * - Illust.imageResponseData[n]
   */
  interface ImageResponse {
    /** 投稿に含まれる画像の枚数 */
    illustPageCount: number
    /** イラストの種類 */
    illustType: IllustType
    /** 360x360 suffix: square1200 */
    imageUrl: string
    /** アバター */
    profileImageUrl: string
    /** 公開範囲 */
    restrict: Restrict
    /** 不明 */
    sl: number
    /** イラストのタイトル */
    title: string
    /** 種類(旧) */
    type: 'illust' | 'comic'
    /** 投稿者の Id */
    userId: string
    /** 投稿者表示名 */
    userName: string
    /** イラストの Id */
    workId: string
    /** 表現範囲 */
    xRestrict: XRestrict
  }

  /**
   * 職業
   * - User.job
   */
  interface Job {
    /** 職業 */
    name: string | null
    /** 公開範囲 */
    privacyLevel: RestrictString | null
  }

  /** POST /ajax/illusts/like */
  interface LikeData {
    /** いいね！の状態 */
    is_liked: boolean
  }

  /**
   * ヘッダタグ内の情報
   * - Illust.extraData.meta
   * - Profile.extraData.meta
   */
  interface Meta {
    /** link[rel=”canonical”] */
    canonical: string
    /** meta[name="description"] */
    description: string
    /** meta[name="keywords"] */
    keywords: string
    /** Open Graph Protocol */
    ogp: Ogp
    /** ページタイトル */
    title: string
    /** Twitter Cards */
    twitter: Twitter
  }

  /**
   * Open Graph Protocol
   * - Illust.extraData.meta.ogp: イラストページの OGP
   * - Profile.extraData.meta.ogp: ユーザーページの OGP
   */
  interface Ogp {
    /** meta[property="og:description"] */
    description: string
    /** meta[property="og:image"] */
    image: string
    /** meta[property="og:title"] */
    title: string
    /** meta[property="og:type"] */
    type: string
  }

  /**
   * 画像情報
   * - Pages[n]
   */
  interface Page {
    /** 画像の高さ */
    height: number
    /** 画像の URL セット */
    urls: PageUrls
    /** 画像の幅 */
    width: number
  }

  /** GET /ajax/illust/:illustId/pages */
  type Pages = Array<Page>

  /**
   * 画像の URL セット
   * - Page.urls
   */
  interface PageUrls {
    /** オリジナル */
    original: string
    /** 1200x1200 suffix: master1200 */
    regular: string
    /** 540x540 suffix: master1200 */
    small: string
    /** 128x128 suffix: square1200 */
    thumb_mini: string
  }

  /**
   * 投票
   * -Illust.pollData
   */
  interface Poll {
    /** 選択肢 */
    choices: {
      [index: number]: Choice
    }
    /** 質問 */
    question: string
    /** 選んだ Id */
    selectedValue: number | null
    /** 回答した人の数 */
    total: number
  }

  /** GET /ajax/user/:userId/profile/top */
  interface Profile {
    /** 追加情報 */
    extraData: ExtraData
    /** 最近投稿されたイラスト一覧 */
    illusts:
      | {
          [illustId: string]: SimpleIllust
        }
      | never[]
    /** 最近投稿された漫画一覧 */
    manga:
      | {
          [illustId: string]: SimpleIllust
        }
      | never[]
    /** 最近投稿された小説一覧 */
    novels: never[]
    /** ads 関連 */
    zoneConfig: any
  }

  /**
   * 住所
   * - User.region
   */
  interface Region {
    /** 都道府県名 */
    name: string | null
    /** 公開範囲 */
    privacyLevel: RestrictString | null
  }

  /** 汎用 レスポンス型 */
  interface ResponseData<T> {
    /** Content */
    body: T
    /** エラーか? */
    error: boolean
    /** エラーメッセージ */
    message: string
  }

  /**
   * 公開範囲 { 0=公開, 1=マイピクのみ, 2=非公開 }
   * - Illust.restrict
   * - IllustSimple.restrict
   * - ImageResponse.restrict
   * */
  type Restrict = 0 | 1 | 2

  /**
   * 公開範囲 { 0=公開, 1=マイピクのみ, 2=非公開 }
   * - User.birthDay
   * - User.gender
   * - User.job
   * - User.region
   * */
  type RestrictString = '0' | '1' | '2'

  /**
   * シリーズ情報
   * - Illust.seriesNavData
   */
  interface Series {
    /** 次の投稿 */
    next: SeriesItem | null
    /** 現在の話数 */
    order: number
    /** 前の投稿 */
    prev: SeriesItem | null
    /** シリーズの Id /user/:userId/series/:seriesId */
    seriesId: string
    /** シリーズのタイトル */
    title: string
  }

  /**
   * シリーズ情報簡易版
   * - Illust.seriesNavData.next
   * - Illust.seriesNavData.prev
   */
  interface SeriesItem {
    /** イラストの Id */
    illustId: string
    /** 現在の話数 */
    order: number
    /** イラストのタイトル */
    title: string
  }

  /**
   * 簡易版イラスト情報
   * - Illust.userIllusts[illustId]
   */
  interface SimpleIllust {
    /** ブックマークデータ */
    bookmarkData: BookmarkData | null
    /** イラストのコメント */
    description: string
    /** 一枚目の画像の高さ */
    height: number
    /** イラストの Id */
    id: string
    /** id alias */
    illustId: string
    /** イラストのタイトル */
    illustTitle: string
    /** イラストの種類 */
    illustType: IllustType
    /** ブックマーク可能か? */
    isBookmarkable: boolean
    /** 投稿に含まれる画像の枚数 */
    pageCount: number
    /** 公開範囲 */
    restrict: Restrict
    /** 不明 */
    sl: number
    /** タグリスト */
    tags: string[]
    /** illustTitle alias */
    title: string
    /** 250x250 suffix: square1200 */
    url: string
    /** 投稿者 Id */
    userId: string
    /** 投稿者表示名 */
    userName: string
    /** 一枚目の画像の幅 */
    width: number
    /** 表現範囲 */
    xRestrict: number
  }

  /**
   * タグ翻訳情報
   * - Illust.tags.tag[n].translation
   *
   * 値には言語設定で選ばれた言語が入る
   */
  interface Translation {
    en: string
  }

  /**
   * Twitter Cards
   * - Illust.extraData.meta.twitter: イラストページの Twitter Cards
   * - Profile.extraData.meta.twitter: ユーザーページの Twitter Cards
   */
  interface Twitter {
    /** meta[name="twitter:card"] */
    card: 'summary'
    /** meta[name="twitter:description"] */
    description: string
    /** meta[name="twitter:image"] */
    image: string
    /** meta[name="twitter:title"] */
    title: string
  }

  /** GET /ajax/illust/:illustId/ugoira_meta */
  interface Ugoira {
    /** フレーム情報 */
    frames: Frame[]
    /** MIME タイプ */
    mime_type: string
    /** オリジナル zip file suffix: ugoira1920x1080 */
    originalSrc: string
    /** 600x600 zip file suffix: ugoira600x600 */
    src: string
  }

  /** GET /ajax/user/:userId?full=1 */
  interface User {
    /** 背景設定 */
    background: Background | null
    /** 誕生日 */
    birthDay: BirthDay
    /** プロフィールコメント */
    comment: string
    /** HTML 形式 プロフィールコメント */
    commentHtml: string
    /** フォローバック */
    followedBack: boolean
    /** フォロイー人数 */
    following: number
    /** 性別 */
    gender: Gender
    /** グループ */
    group: null
    /** 50x50 */
    image: string
    /** 170x170 */
    imageBig: string
    /** ミュートされているか? */
    isBlocking: boolean
    /** フォローしているか? */
    isFollowed: boolean
    /** マイピクか? */
    isMypixiv: boolean
    /** 職業 */
    job: Job
    /** ユーザー名 */
    name: string
    /** オフィシャルアカウントか? */
    official: boolean
    /** 謎 */
    partial: number
    /** プレミアム会員か? */
    premium: boolean
    /** 住所 */
    region: Region
    /**
     * ソーシャルメディアアカウント
     * - twitter
     * - facebook
     * - instagram
     * - tumblr
     * - circlems
     * - pawoo
     */
    social: {
      [key: string]: {
        url: string
      }
    }
    /** ユーザーの Id */
    userId: string
    /** Web ページ URL */
    webpage: string | null
    /** 作業環境 */
    workspace: Workspace
  }

  /**
   * 表現範囲 { 0=一般, 1=R-18, 2=R-18G }
   * - Illust.xRestrict
   * - IllustSimple.xRestrict
   * - ImageResponse.xRestrict
   * */
  type XRestrict = 0 | 1 | 2

  /**
   * 作業環境
   * - User.workspace
   * */
  interface Workspace {
    /** 椅子 */
    userWorkspaceChair?: string
    /** 机 */
    userWorkspaceDesk?: string
    /** 机の上にあるもの */
    userWorkspaceDesktop?: string
    /** モニター */
    userWorkspaceMonitor?: string
    /** 絵を描く時に聞く音楽 */
    userWorkspaceMusic?: string
    /** コンピュータ */
    userWorkspacePc?: string
    /** プリンター */
    userWorkspacePrinter?: string
    /** スキャナー */
    userWorkspaceScanner?: string
    /** タブレット */
    userWorkspaceTablet?: string
    /** ソフト */
    userWorkspaceTool?: string
    /** 作業環境の画像 大 */
    wsBigUrl?: string
    /** 作業環境の画像 小 */
    wsUrl?: string
  }
}
