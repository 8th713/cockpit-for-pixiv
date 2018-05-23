import { observable, computed, action, runInAction } from 'mobx'
import { Bookmark } from './Bookmark'
import { Image } from './Image'
import { Ugoira } from './Ugoira'
import { Status, Services } from '../../types'

export interface IllustAttrs {
  // Clientが挿入
  isSelf: boolean
  // 種別[イラスト,小説]
  contentType: 'illust' | 'novel'
  error: boolean
  // 綴じ方向[無,右,左]
  illustBookStyle: '0' | '1' | '2'
  // 拡張子
  illustExt: string
  // 高さ[一枚目のみ]
  illustHeight: string
  // 識別子
  illustId: string
  // 枚数
  illustPageCount: string
  // 公開範囲[公開,マイピク,非公開]
  illustRestrict: '0' | '1' | '2'
  // 健全性
  illustSanityLevel: number
  // タイトル
  illustTitle: string
  // イラストの種類[画像,漫画,動画]
  illustType: '0' | '1' | '2'
  // 幅[一枚目のみ]
  illustWidth: string
  // 18禁[規制内,R-18,R-18G]
  illustXRestrict: '0' | '1' | '2'
  // ブックマーク
  isBookmarked: boolean
  // コメント
  isCommented: boolean
  // 複数枚
  isMultiple: boolean
  // いいね！
  isRated: boolean
  // アバター
  profileImg: string
  // 縮小サイズうごイラメタデータ[600x600][JSON string]
  ugoiraMeta: string | null
  // フルサイズうごイラメタデータ[JSON string]
  ugoiraMetaFullscreen: string | null
  // URLs
  url: {
    // サムネイル URL[240x480]
    '240mw': string
    // オリジナル URL
    big: string
    // モバイル URL[600x600]
    m: string
    // 縮小サイズうごイラ URL[600x600]
    ugoira600x600: string
  }
  // 投稿者名
  userName: string
  // 投稿者識別子
  userId: string
}

export interface Tag {
  // タグ
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
}

export interface DetailsAttrs {
  // ブックマーク数
  bookmarkCount: number
  bookmarkData: null | {
    // ブックマーク識別子
    id: string
    // ブックマークの公開状態
    private: boolean
  }
  // pixiv comic 連動
  comicPromotion: null
  // コメント数
  commentCount: number
  // コンテスト関連
  contestBanners: any[]
  // ISOString 投稿日
  createDate: string
  // Booth 関連
  descriptionBoothId: null
  // ファクトリー関連
  factoryGoods: {
    integratable: false
    integrated: false
  }
  // 高さ[一枚目のみ]
  height: number
  // キャプション
  illustComment: string
  // 投稿識別子
  illustId: string
  illustSeries?: {
    // シリーズタイトル
    title: string
    // シリーズ URL
    url: string
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
  // ?
  pollData: null
  // レスポンス数
  responseCount: number
  // 公開範囲[公開,マイピク,非公開]
  restrict: 0 | 1 | 2
  // シリーズナビゲーション
  seriesNavData: null | {
    next: {
      // イラスト識別子
      illustId: string
      // 話数
      order: number
      // 作品名
      title: string
    }
    // 話数
    order: number
    prev: {
      // イラスト識別子
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
  tags: {
    // 投稿者識別子
    authorId: string
    // タグロック状態
    isLocked: boolean
    // タグリスト
    tags: Tag[]
    writable: boolean // タグを追加できるか
  }
  // ISOString 更新日
  uploadDate: string
  urls: {
    mini: string // 48x48
    thumb: string // 240x240
    small: string // 540x540
    regular: string // 1200x1200
    original: string // オリジナル
  }
  // 投稿者識別子
  userId: string
  // 18禁[規制内,R-18,R-18G]
  xRestrict: 0 | 1 | 2
  userIllusts: {
    [illustId: string]: null | {
      bookmarkData: null // ?
      height: number // 高さ[一枚目のみ]
      illustId: string // 投稿識別子
      illustTitle: string // タイトル
      illustType: 0 | 1 | 2 // イラストの種類[画像,漫画,動画]
      isBookmarkable: boolean // ブックマーク可能か
      pageCount: number // 枚数
      tags: string[] // タグリスト
      url: string // 240x240
      userId: string // 投稿者識別子
      width: number // 幅[一枚目のみ]
      xRestrict: 0 | 1 | 2 // 18禁[規制内,R-18,R-18G]
    }
  }
  // 閲覧数
  viewCount: number
  // 幅[一枚目のみ]
  width: number
  // 不明
  zoneConfig: {}
}

export const enum IllustType {
  IMAGE = 'image',
  COMIC = 'comic',
  UGOIRA = 'ugoira'
}

const ILLUST = '/member_illust.php?mode=medium&illust_id='
const AUTHOR = '/member_illust.php?id='

export class Illust {
  private services: Services

  id: string
  isMultiple: boolean
  isUgoira: boolean
  isSelf: boolean
  page: number
  binding: '0' | '1' | '2'

  title: string
  illustURL: string
  thumbnail: string
  restrict: '0' | '1' | '2'
  xRestrict: '0' | '1' | '2'
  authorId: string
  authorName: string
  authorHref: string
  authorAvatar: string

  @observable isRated: boolean
  @observable date: string = ''
  @observable viewCount: number = 0
  @observable likeCount: number = 0
  @observable illustComment: string = ''
  @observable.ref tags: Tag[] = []

  @observable isUpdating: boolean = false

  @observable status: Status = Status.IDLING

  @computed
  get shouldRequest() {
    return this.status === Status.IDLING || this.status === Status.REJECTED
  }

  bookmark: Bookmark
  images: Array<Image | Ugoira>

  constructor(services: Services, attrs: IllustAttrs) {
    this.services = services

    this.id = attrs.illustId
    this.isMultiple = attrs.isMultiple
    this.isUgoira = !!attrs.ugoiraMeta
    this.isSelf = attrs.isSelf
    this.page = Number(attrs.illustPageCount)
    this.binding = attrs.illustBookStyle

    this.title = attrs.illustTitle
    this.illustURL = `${ILLUST}${attrs.illustId}`
    this.thumbnail = attrs.url['240mw']
    this.restrict = attrs.illustRestrict
    this.xRestrict = attrs.illustXRestrict
    this.isRated = attrs.isRated

    this.authorId = attrs.userId
    this.authorName = attrs.userName
    this.authorHref = `${AUTHOR}${attrs.userId}`
    this.authorAvatar = attrs.profileImg

    this.bookmark = new Bookmark(services.client, attrs)
    this.images = this.isUgoira
      ? Ugoira.fromAttrs(attrs)
      : Image.fromAttrs(services.client, attrs)
  }

  async loadIfNeeded() {
    if (this.shouldRequest) {
      return this.request()
    }
  }

  async likeItIfNeeded() {
    if (!this.isSelf && !this.isRated && !this.isUpdating) {
      return this.likeIt()
    }
  }

  share() {
    const { illustURL, title, authorName } = this
    const text = `${title} | ${authorName} #pixiv`
    const link = `https://www.pixiv.net${illustURL}`

    this.services.share.open(text, link)
  }

  download() {
    const images = this.images.map(({ src, alt }) => ({ src, alt }))
    const { title, authorName: author } = this
    let type: IllustType

    if (this.isUgoira) {
      type = IllustType.UGOIRA
    } else if (this.isMultiple) {
      type = IllustType.COMIC
    } else {
      type = IllustType.IMAGE
    }

    const port = this.services.addon.getPort('download')

    if (port) {
      port.postMessage({ images, title, author, type })
    } else {
      alert('download addon not install')
    }
  }

  private async request() {
    this.status = Status.FETCHING

    try {
      const attrs = await this.services.client.getIllustPage(this.id)

      runInAction(() => {
        this.date = new Date(attrs.createDate).toLocaleString()
        this.viewCount = attrs.viewCount
        this.likeCount = attrs.likeCount
        this.illustComment = attrs.illustComment
        this.tags = attrs.tags.tags
        this.status = Status.RESOLVED
      })
    } catch {
      runInAction(() => {
        this.status = Status.REJECTED
      })
    }
  }

  @action
  private async likeIt() {
    const prev = this.toCache()

    this.likeCount += 1
    this.isRated = true
    this.isUpdating = true

    try {
      await this.services.client.likeIt(this.id)
      runInAction(() => {
        this.isUpdating = false
      })
    } catch {
      runInAction(() => {
        Object.assign(this, prev)
        this.isUpdating = false
      })
    }
  }

  private toCache() {
    return {
      rateCount: this.likeCount,
      isRated: this.isRated
    }
  }
}
