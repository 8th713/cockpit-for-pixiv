// @flow
/*global $ */
import {action} from 'mobx'
import route, {type Route} from '../store/route'
import scrollBar, {type ScrollBar} from '../store/scrollBar'
import repository, {type Repository} from '../service/repository'

const EVENT_TYPE = 'click.cockpit'
const WORK = '._work'
const BADGE = '.latest-illust-series-content-badge'
const THUMBNAIL = 'a[href*="member_illust.php?mode=medium"] img[src*="/img/"]'

export class RouteUseCase {
  route: Route;
  scrollBar: ScrollBar;
  repository: Repository;

  constructor(route: Route, scrollBar: ScrollBar, repository: Repository) {
    this.route = route
    this.scrollBar = scrollBar
    this.repository = repository

    $(document.body).on(EVENT_TYPE, (event: JQueryEventObject) => {
      let $target = $(event.target)

      if ($target.is(BADGE)) {
        $target = $target.parents('a')
      }
      if ($target.is(WORK)) {
        $target = $target.find('img')
      }
      if ($target.is(THUMBNAIL)) {
        event.preventDefault()
        const target: HTMLImageElement = $target.get()[0]

        this.open(target)
      }
    })
  }

  findElement(dir: number) {
    const {element} = this.route

    if (!element) { return }

    const list: HTMLImageElement[] = $(THUMBNAIL).toArray()
    const index = list.indexOf(element)

    if (index === -1) { return undefined }

    return list[index + dir]
  }

  @action.bound open(element: HTMLImageElement) {
    this.scrollBar.hide(element)
    this.route.setElement(element)
    this.repository.resolveByElement(element)
      .then(illust => this.route.setIllust(illust))
  }

  @action.bound close() {
    this.route.reset()
    this.scrollBar.show()
  }

  step(dir: number) {
    const element = this.findElement(dir)

    if (element) {
      this.open(element)
    }
  }
}

export default new RouteUseCase(route, scrollBar, repository)
