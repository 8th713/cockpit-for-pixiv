// @flow
import {action} from 'mobx'
import route, {type Route} from '../store/route'
import editor, {type Editor} from '../store/editor'
import bookmarkFactory, {type BookmarkFactory} from '../factory/bookmarkFactory'
import type Illust from '../entity/illust'
import type Tag from '../entity/tag'

export class EditorUseCase {
  route: Route;
  editor: Editor;
  factory: BookmarkFactory;

  constructor(
    route: Route,
    editor: Editor,
    factory: BookmarkFactory
  ) {
    this.route = route
    this.editor = editor
    this.factory = factory

    route.onChange(this.handleChange)
    editor.onOpen(this.handleOpen)
  }

  @action.bound open() {
    const {illust} = this.route

    if (illust) {
      this.editor.toggle(true)
    }
  }

  @action.bound close() {
    this.editor.toggle(false)
  }

  toggle = () => {
    if (this.editor.opened) {
      this.close()
    } else {
      this.open()
    }
  };

  @action.bound editRestrict(restrictStr: string) {
    const restrict = Number(restrictStr)

    this.editor.edit({restrict})
  }

  @action.bound editComment(comment: string) {
    this.editor.edit({comment})
  }

  @action.bound editTags(tags: string) {
    this.editor.edit({tags})
  }

  @action.bound toggleTag(tag: Tag) {
    if (tag.active) {
      this.editor.removeTag(tag.name)
    } else {
      this.editor.addTag(tag.name)
    }
  }

  @action.bound load(illust: Illust) {
    const {bookmark} = illust
    let promise = Promise.resolve()

    if (bookmark.canLoad) {
      bookmark.load()
      promise = this.factory.fetch(bookmark.id)
        .then(src => bookmark.loadSuccess(src))
        .catch(() => bookmark.loadFailure())
    }
    promise.then(() => {
      this.editor.edit(bookmark.source)
    })
  }

  handleChange = (illust: Illust) => {
    if (this.editor.opened) {
      this.load(illust)
    }
  };

  handleOpen = () => {
    if (this.route.illust) {
      this.load(this.route.illust)
    }
  };
}

export default new EditorUseCase(route, editor, bookmarkFactory)
