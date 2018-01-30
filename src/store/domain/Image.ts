import { observable, computed, action, runInAction } from 'mobx'
import { IllustAttrs } from './Illust'
import { Status, ClientService } from '../../types'

export interface ImageAttrs {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

export class Image {
  private client: ClientService

  id: string
  src: string
  alt: string
  @observable width: number
  @observable height: number
  @observable status: Status = Status.IDLING

  @computed
  get shouldRequest() {
    return this.status === Status.IDLING || this.status === Status.REJECTED
  }

  constructor(client: ClientService, attrs: ImageAttrs) {
    this.client = client
    this.id = attrs.id
    this.src = attrs.src
    this.alt = attrs.alt
    this.width = attrs.width
    this.height = attrs.height
  }

  private async request() {
    this.status = Status.FETCHING
    try {
      const size = await this.client.getImage(this.src)

      runInAction(() => {
        this.width = size.naturalWidth
        this.height = size.naturalHeight
        this.status = Status.RESOLVED
      })
    } catch {
      runInAction(() => {
        this.status = Status.REJECTED
      })
    }
  }

  @action.bound
  handleChange(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting && this.shouldRequest) {
      this.request()
    }
  }

  static fromAttrs(client: ClientService, attrs: IllustAttrs) {
    if (attrs.isMultiple) {
      return this.genImages(client, attrs)
    } else {
      return this.genImage(client, attrs)
    }
  }

  private static genImage(client: ClientService, attrs: IllustAttrs) {
    return [
      new Image(client, {
        id: attrs.illustId,
        src: attrs.url.big,
        alt: attrs.illustTitle,
        width: Number(attrs.illustWidth),
        height: Number(attrs.illustHeight)
      })
    ]
  }

  private static genImages(client: ClientService, attrs: IllustAttrs) {
    const size = Number(attrs.illustPageCount)
    const baseId = attrs.illustId
    const baseSrc = attrs.url.big
    const baseAlt = attrs.illustTitle
    const width = Number(attrs.illustWidth)
    const height = Number(attrs.illustHeight)

    return genList(size).map(
      page =>
        new Image(client, {
          id: `${baseId}-${page}`,
          src: baseSrc.replace('_p0', `_p${page}`),
          alt: `${baseAlt}(${page + 1}-${size})`,
          width,
          height
        })
    )
  }
}

const genList = (num: number) => [...Array(num).keys()]
