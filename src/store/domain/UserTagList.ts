import { observable, computed, action, runInAction } from 'mobx'
import { Status, Services } from '../../types'

export interface TagAttrsDictionary {
  [tagName: string]: {
    lev: number
    total: number
  }
}

export interface UserTag {
  name: string
  total: number
  lev: number
  className: string
}

export const enum SortBy {
  NAME = 'name',
  TOTAL = 'total'
}

const enum SortDirection {
  ASC = '↑',
  DESC = '↓'
}

export class UserTagList {
  private services: Services

  @observable status: Status = Status.IDLING
  @observable sortBy: SortBy = SortBy.NAME
  @observable sortDirection: SortDirection = SortDirection.ASC
  @observable.ref private items: UserTag[] = []

  @computed
  get shouldRequest() {
    return this.status === Status.IDLING || this.status === Status.REJECTED
  }

  @computed
  get reversion() {
    return this.sortDirection === SortDirection.ASC
  }

  @computed
  get sorted() {
    const prop = this.sortBy
    const tags = [...this.items]

    tags.sort((a, b) => {
      const v = a[prop]
      const w = b[prop]

      if (v < w) {
        return 1
      }
      if (v > w) {
        return -1
      }
      return 0
    })

    if (this.reversion) {
      tags.reverse()
    }

    return tags
  }

  constructor(services: Services) {
    this.services = services

    this.sortBy = services.storage.load('sortBy', SortBy.NAME)
    this.sortDirection = services.storage.load(
      'sortDirection',
      SortDirection.ASC
    )
  }

  @action
  changeSort(sortBy: SortBy) {
    if (this.sortBy === sortBy) {
      if (this.sortDirection === SortDirection.ASC) {
        this.sortDirection = SortDirection.DESC
      } else {
        this.sortDirection = SortDirection.ASC
      }
      this.services.storage.store('sortDirection', this.sortDirection)
    } else {
      if (this.sortBy === SortBy.NAME) {
        this.sortBy = SortBy.TOTAL
      } else {
        this.sortBy = SortBy.NAME
      }
      this.services.storage.store('sortBy', this.sortBy)
    }
  }

  loadIfNeeded() {
    if (this.shouldRequest) {
      this.request()
    }
  }

  private async request() {
    this.status = Status.FETCHING
    try {
      const tags = await this.services.client.getUserTag()

      runInAction(() => {
        this.items = this.convertTags(tags)
        this.status = Status.RESOLVED
      })
    } catch {
      runInAction(() => {
        this.status = Status.REJECTED
      })
    }
  }

  private convertTags(userTagDict: TagAttrsDictionary): UserTag[] {
    return Object.keys(userTagDict).map(name => {
      const { lev, total } = userTagDict[name]

      return { name, total, lev, className: `lev${lev}` }
    })
  }
}
