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
  name: string
  url: string
}

export interface DetailsAttrs {
  date: string
  viewCount: number
  rateCount: number
  caption: string
  tags: Tag[]
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
  @observable rateCount: number = 0
  @observable caption: string = ''
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
        this.date = attrs.date
        this.viewCount = attrs.viewCount
        this.rateCount = attrs.rateCount
        this.caption = attrs.caption
        this.tags = attrs.tags
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

    this.rateCount += 1
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
      rateCount: this.rateCount,
      isRated: this.isRated
    }
  }
}
