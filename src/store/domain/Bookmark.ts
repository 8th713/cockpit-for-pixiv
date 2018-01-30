import { observable, computed, action, runInAction } from 'mobx'
import { IllustAttrs } from './Illust'
import { Status, ClientService } from '../../types'

type Restrict = 0 | 1

export interface BookmarkAttrs {
  restrict: Restrict
  comment: string
  tags: string
}

export class Bookmark {
  private client: ClientService

  id: string
  isSelf: boolean

  @observable isBookmarked: boolean
  @observable restrict: 0 | 1 = 0
  @observable comment: string = ''
  @observable tags: string = ''

  @observable isUpdating: boolean = false

  @observable status: Status = Status.IDLING

  @computed
  get shouldRequest() {
    return (
      this.isSelf === false &&
      (this.status === Status.IDLING || this.status === Status.REJECTED)
    )
  }

  constructor(client: ClientService, attrs: IllustAttrs) {
    this.client = client

    this.id = attrs.illustId
    this.isSelf = attrs.isSelf
    this.isBookmarked = attrs.isBookmarked
  }

  async loadIfNeeded() {
    if (this.shouldRequest) {
      return this.request()
    }
  }

  async bookmarkIfNeeded(attrs: BookmarkAttrs) {
    if (!this.isSelf && !this.isUpdating) {
      return this.bookmark(attrs)
    }
  }

  @action
  private async request() {
    this.status = Status.FETCHING
    try {
      const attrs = await this.client.getBookmarkPage(this.id)

      runInAction(() => {
        this.restrict = attrs.restrict
        this.comment = attrs.comment
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
  private async bookmark(attrs: BookmarkAttrs) {
    const prev = this.toCache()

    this.restrict = attrs.restrict
    this.comment = attrs.comment
    this.tags = attrs.tags
    this.isBookmarked = true
    this.isUpdating = true

    try {
      await this.client.bookmark(this.id, attrs)
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
      restrict: this.restrict,
      comment: this.comment,
      tags: this.tags,
      isBookmarked: this.isBookmarked
    }
  }
}
