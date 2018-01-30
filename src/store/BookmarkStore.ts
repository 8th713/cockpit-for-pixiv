import { observable, computed, action, runInAction, reaction } from 'mobx'
import { Repository } from './Repository'
import { BookmarkVM } from './domain/BookmarkVM'
import { UserTagList } from './domain/UserTagList'
import { Status, Services } from '../types'

export class BookmarkStore {
  private repository: Repository

  userTag: UserTagList
  attrs: BookmarkVM

  @computed
  get current() {
    return this.repository.current
  }

  @computed
  get status() {
    if (this.current) {
      return this.current.bookmark.status
    }
    return Status.IDLING
  }

  @observable opened: boolean = false

  constructor(services: Services, repository: Repository) {
    this.repository = repository
    this.userTag = new UserTagList(services)
    this.attrs = new BookmarkVM()

    reaction(() => this.current, () => this.close())
  }

  @action
  async open() {
    if (this.current && this.current.isSelf === false) {
      const { bookmark } = this.current

      this.opened = true
      this.attrs.clear()
      this.userTag.loadIfNeeded()
      this.current.loadIfNeeded()
      await bookmark.loadIfNeeded()

      runInAction(() => {
        this.attrs.update(bookmark)
      })
    }
  }

  @action
  close() {
    this.opened = false
  }

  async submit() {
    if (this.current && this.current.isSelf === false) {
      const { bookmark } = this.current

      await bookmark.bookmarkIfNeeded(this.attrs.asData)
      this.close()
    }
  }
}
