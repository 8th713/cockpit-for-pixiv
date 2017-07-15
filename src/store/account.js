// @flow
/*global pixiv */
import {observable, computed} from 'mobx'
import storage, {type Storage} from '../service/storage'
import type Tag from '../entity/tag'

export class Account {
  storage: Storage;

  loggedIn: boolean;
  id: string;
  token: string;

  @observable sortBy: 'name' | 'total';
  @observable sortDirection: 'asc' | 'desc';
  @observable.ref tags: Tag[];

  @observable isLoading: boolean;
  @observable isFetched: boolean;

  constructor(storage: Storage) {
    this.storage = storage

    this.loggedIn = pixiv.user.loggedIn
    this.id = pixiv.user.id
    this.token = pixiv.context.token

    this.sortBy = storage.load('sortBy', 'total')
    this.sortDirection = storage.load('sortDirection', 'desc')
    this.tags = []

    this.isLoading = false
    this.isFetched = false
  }

  @computed get sortedTags(): Tag[] {
    const prop = this.sortBy
    const tags = [...this.tags]

    tags.sort((a, b) => {
      // $FlowFixMe
      const v = a[prop]
      // $FlowFixMe
      const w = b[prop]

      if (v < w) { return 1 }
      if (v > w) { return -1 }
      return 0;
    })

    if (this.sortDirection === 'asc') {
      tags.reverse()
    }

    return tags
  }

  @computed get canLoad(): boolean {
    return !this.isFetched && !this.isLoading
  }

  load() {
    this.isLoading = true
  }

  loadSuccess(tags: Tag[]) {
    this.tags = tags
    this.isLoading = false
    this.isFetched = true
  }

  loadFailure() {
    this.isFetched = false
    this.isLoading = false
  }

  changeOrder() {
    this.sortBy = (this.sortBy === 'name') ? 'total' : 'name'
    this.storage.store('sortBy', this.sortBy)
  }

  changeDirection() {
    this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc'
    this.storage.store('sortDirection', this.sortDirection)
  }

  changeSort(prop: 'name' | 'total') {
    if (this.sortBy === prop) {
      this.changeDirection()
    } else {
      this.changeOrder()
    }
  }
}

export default new Account(storage)
