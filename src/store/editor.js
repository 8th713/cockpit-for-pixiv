// @flow
/*global colon */
import {observable, computed, reaction} from 'mobx'
import route, {type Route} from './route'

export class Editor {
  route: Route;

  @observable opened: boolean;
  @observable isEdit: boolean;
  @observable restrict: number;
  @observable comment: string;
  @observable tags: string;

  constructor(route: Route) {
    this.route = route

    this.opened = false
    this.isEdit = false
    this.restrict = 0
    this.comment = ''
    this.tags = ''
  }

  @computed get commentSize(): string {
    return `${this.comment.length} / 140`
  }

  @computed get tagArray(): string[] {
    return colon.ui.Tag.split(this.tags)
  }

  @computed get tagSize(): string {
    return `${this.tagArray.length} / 10`
  };

  @computed get source(): BookmarkSource {
    const {restrict, comment, tags} = this

    return {restrict, comment, tags}
  }

  toggle(force: boolean = !this.opened) {
    this.opened = force
  }

  edit(src: $Shape<BookmarkSource>) {
    Object.assign(this, src)
  }

  addTag(tag: string) {
    this.tags = `${this.tags.trim()} ${tag}`
  }

  removeTag(tag: string) {
    const tags = [...this.tagArray]
    const index = tags.indexOf(tag)

    tags.splice(index, 1)
    this.tags = tags.join(' ')
  }

  onOpen(effect: () => any) {
    return reaction(() => this.opened, (opened) => {
      if (opened) { effect() }
    })
  }
}

export default new Editor(route)
