// @flow
import {action} from 'mobx'
import bookmarkFactory, {type BookmarkFactory} from '../factory/bookmarkFactory'
import detailFactory, {type DetailFactory} from '../factory/detailFactory'
import route, {type Route} from '../store/route'
import editor, {type Editor} from '../store/editor'
import popUp, {type PopUp} from '../service/popup'

export class IllustUseCase {
  bookmarkFactory: BookmarkFactory;
  detailFactory: DetailFactory;

  route: Route;
  editor: Editor;

  popUp: PopUp;

  constructor(
    bookmarkFactory: BookmarkFactory,
    detailFactory: DetailFactory,
    route: Route,
    editor: Editor,
    popUp: PopUp,
  ) {
    this.bookmarkFactory = bookmarkFactory
    this.detailFactory = detailFactory
    this.popUp = popUp
    this.route = route
    this.editor = editor
  }

  @action.bound bookmark() {
    const {illust} = this.route

    if (illust && !illust.bookmark.isSelf) {
      const src = this.editor.source
      const rollback = illust.bookmark.bookmark(src)

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
  }
}

export default new IllustUseCase(
  bookmarkFactory,
  detailFactory,
  route,
  editor,
  popUp,
)
