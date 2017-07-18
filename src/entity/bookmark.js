// @flow
import {observable, computed} from 'mobx'
import type {Account} from '../store/account'

export default class Bookmark {
  id: string;
  @observable isBookmarked: boolean;
  @observable restrict: number;
  @observable comment: string;
  @observable tags: string;

  isSelf: boolean;
  @observable isLoading: boolean;
  @observable isFetched: boolean;

  constructor(account: Account, src: IllustSource) {
    this.id = src.illustId
    this.isBookmarked = src.isBookmarked
    this.restrict = 0
    this.comment = ''
    this.tags = ''

    this.isSelf = account.id === src.userId
    this.isLoading = false
    this.isFetched = false
  }

  @computed get source(): BookmarkSource {
    const {restrict, comment, tags} = this

    return {restrict, comment, tags}
  }

  @computed get canLoad(): boolean {
    return !this.isFetched && !this.isLoading && !this.isSelf
  }

  load() {
    this.isLoading = true
  }

  loadSuccess(src: BookmarkSource) {
    Object.assign(this, src)
    this.isLoading = false
    this.isFetched = true
  }

  loadFailure() {
    this.isFetched = false
    this.isLoading = false
  }

  bookmark(src: BookmarkSource) {
    const {isBookmarked, restrict, comment, tags} = this

    this.isBookmarked = true
    this.restrict = src.restrict
    this.comment = src.comment
    this.tags = src.tags

    return () => {
      this.isBookmarked = isBookmarked
      this.restrict = restrict
      this.comment = comment
      this.tags = tags
    }
  }
}
