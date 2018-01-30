import { observable, computed, action } from 'mobx'
import { BookmarkAttrs } from './Bookmark'

export class BookmarkVM implements BookmarkAttrs {
  @observable restrict: 0 | 1 = 0
  @observable comment: string = ''
  @observable tags: string = ''

  @computed
  get commentCount() {
    return `${this.comment.length} / 140`
  }

  @computed
  private get tagArray() {
    return this.tags.split(/[\s\xA0　]+/)
  }

  @computed
  get tagCount() {
    return `${this.tagArray.length} / 10`
  }

  @computed
  get tagValid() {
    return this.tagArray.length <= 10
  }

  @computed
  get asData(): BookmarkAttrs {
    return {
      restrict: this.restrict,
      comment: this.comment,
      tags: this.tags
    }
  }

  clear() {
    this.restrict = 0
    this.comment = ''
    this.tags = ''
  }

  @action
  update(attrs: Partial<BookmarkAttrs>) {
    Object.assign(this, attrs)
  }

  @action
  addTag(tag: string) {
    this.tags = `${this.tags.trim()} ${tag}`
  }

  @action
  removeTag(tag: string) {
    const tags = [...this.tagArray]
    const index = tags.indexOf(tag)

    tags.splice(index, 1)
    this.tags = tags.join(' ')
  }

  includes(tag: string) {
    return this.tagArray.includes(tag)
  }
}
