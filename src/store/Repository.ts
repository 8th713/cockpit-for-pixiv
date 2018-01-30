import { observable, computed, action, runInAction, ObservableMap } from 'mobx'
import { Services, Status } from '../types'
import { Illust } from './domain/Illust'

export class Repository {
  private services: Services
  private items: ObservableMap<Illust>

  @observable status: Status = Status.IDLING
  @observable element: HTMLAnchorElement | void

  @computed
  get id() {
    if (this.element) {
      return this.services.page.getId(this.element)
    }
    return ''
  }

  @computed
  get current() {
    return this.items.get(this.id)
  }

  @computed
  get isControllable() {
    return this.status === Status.RESOLVED
  }

  constructor(services: Services) {
    this.services = services
    this.items = observable.shallowMap()
  }

  @action
  resolve(target: HTMLAnchorElement) {
    this.element = target
    this.services.page.toggleScrollbar(false)
    this.services.page.scrollWindow(target)

    if (this.items.has(this.id) === false) {
      this.request(this.id)
    } else {
      this.status = Status.RESOLVED
    }
  }

  cycle(reversion: boolean) {
    if (this.element) {
      const step = reversion ? -1 : 1
      const target = this.services.page.findThumbnail(this.element, step)

      if (target) {
        this.resolve(target)
      }
    }
  }

  clear() {
    this.element = undefined
    this.status = Status.IDLING
    this.services.page.toggleScrollbar(true)
  }

  private async request(id: string) {
    this.status = Status.FETCHING

    try {
      const attrs = await this.services.client.getIllust(id)
      const illust = new Illust(this.services, attrs)

      runInAction('repository.done', () => {
        this.items.set(illust.id, illust)
        this.status = Status.RESOLVED
      })
    } catch {
      runInAction('repository.failed', () => {
        this.status = Status.REJECTED
      })
    }
  }
}
