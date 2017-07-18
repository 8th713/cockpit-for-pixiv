// @flow
import {action} from 'mobx'
import bookmarkFactory, {type BookmarkFactory} from '../factory/bookmarkFactory'
import detailFactory, {type DetailFactory} from '../factory/detailFactory'
import route, {type Route} from '../store/route'
import editor, {type Editor} from '../store/editor'
import popUp, {type PopUp} from '../service/popup'
import addon, {type Addon} from '../service/addon'

export class IllustUseCase {
  bookmarkFactory: BookmarkFactory;
  detailFactory: DetailFactory;

  route: Route;
  editor: Editor;

  popUp: PopUp;
  addon: Addon;

  constructor(
    bookmarkFactory: BookmarkFactory,
    detailFactory: DetailFactory,
    route: Route,
    editor: Editor,
    popUp: PopUp,
    addon: Addon,
  ) {
    this.bookmarkFactory = bookmarkFactory
    this.detailFactory = detailFactory
    this.route = route
    this.editor = editor
    this.popUp = popUp
    this.addon = addon
  }

  @action.bound bookmark() {
    const {illust} = this.route

    if (illust && !illust.bookmark.isSelf) {
      const src = this.editor.source
      const rollback = illust.bookmark.bookmark(src)

      this.editor.toggle(false)
      this.bookmarkFactory.bookmark(illust.id, src).catch(rollback)
    }
  }

  @action.bound likeIt() {
    const {illust} = this.route

    if (illust && illust.detail.canRate) {
      const rollback = illust.detail.rateUp()

      this.detailFactory.likeIt(illust.id).catch(rollback)
    }
  }

  @action.bound share() {
    const {illust} = this.route

    if (illust) {
      const {id, title, userName} = illust
      const pixiv = new URL('http://www.pixiv.net/member_illust.php')
      const twitter = new URL('https://twitter.com/intent/tweet')

      pixiv.searchParams.set('mode', 'medium')
      pixiv.searchParams.set('illust_id', id)
      twitter.searchParams.set('text', `${title} | ${userName} #pixiv`)
      twitter.searchParams.set('url', pixiv.toString())
      this.popUp.open(twitter.toString())
    }
  }

  @action.bound download() {
    const {illust} = this.route

    if (illust) {
      const {type, title, userName: author} = illust
      const images = illust.images.map(image => image.attrs)
      const src = {images, title, author, type}

      this.addon.post('cockpit-download-addon', src)
    }
  }
}

export default new IllustUseCase(
  bookmarkFactory,
  detailFactory,
  route,
  editor,
  popUp,
  addon,
)
