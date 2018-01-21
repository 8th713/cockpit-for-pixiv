// @flow
/*global $ */
import {action} from 'mobx'
import route, {type Route} from '../store/route'
import scrollBar, {type ScrollBar} from '../store/scrollBar'
import repository, {type Repository} from '../service/repository'

const WORK = '.bBzsEVG,.JXPrM4l,._work'

export class RouteUseCase {
  route: Route;
  scrollBar: ScrollBar;
  repository: Repository;

  constructor(route: Route, scrollBar: ScrollBar, repository: Repository) {
    this.route = route
    this.scrollBar = scrollBar
    this.repository = repository

    document.body.addEventListener('click', (event: MouseEvent) => {
      const target = event.target.closest(WORK)

      if (target) {
        event.preventDefault()
        this.open(target)
      }
    })
  }

  findElement(dir: number) {
    const {element} = this.route

    if (!element) { return }

    const list = Array.from(document.querySelectorAll(WORK))
    const index = list.indexOf(element)

    if (index === -1) { return undefined }

    return list[index + dir]
  }

  @action.bound open(element: HTMLAnchorElement) {
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
