import { observable, computed, action, reaction } from 'mobx'
import { Repository } from './Repository'
import { Services } from '../types'

export const enum Fit {
  NONE,
  COVER,
  CONTAIN
}

export const enum Spread {
  NONE,
  SPREAD,
  SPREAD_SHIFT
}

export interface Size {
  width: number
  height: number
}

export class ViewStore {
  private services: Services
  private repository: Repository
  private observer: ResizeObserver

  @observable fit: Fit
  @observable spread: Spread
  @observable forcedSpread: boolean
  @observable padding: number
  @observable width: number = 0
  @observable height: number = 0
  @observable.ref frame: HTMLElement | null = null

  @computed
  get opened() {
    return !!this.repository.element
  }

  @computed
  get status() {
    return this.repository.status
  }

  @computed
  get current() {
    return this.repository.current
  }

  @computed
  get finalBinding() {
    if (this.current) {
      switch (this.current.binding) {
        case '0': {
          return this.forcedSpread ? 'rtl' : ''
        }
        case '1':
          return 'rtl'
        case '2':
          return 'ltr'
      }
    }
    return ''
  }

  @computed
  get finalSpread() {
    if (this.current) {
      return this.spread !== Spread.NONE && this.current.page > 1
    }
    return false
  }

  @computed
  get finalShift() {
    if (this.current) {
      return this.spread === Spread.SPREAD_SHIFT && this.current.page > 2
    }
    return false
  }

  @computed
  get cell() {
    const finalHeight = this.height - this.padding * 2
    let finalWidth = this.width - this.padding * 2

    if (this.finalSpread) {
      finalWidth /= 2
    }

    return {
      width: finalWidth,
      height: finalHeight
    }
  }

  constructor(services: Services, repository: Repository) {
    this.services = services
    this.repository = repository
    this.fit = services.storage.load('fit', Fit.COVER)
    this.spread = services.storage.load('spread', Spread.SPREAD)
    this.forcedSpread = services.storage.load('forcedSpread', true)
    this.padding = services.storage.load('padding', 16)
    this.observer = services.page.buildResizeObserver(this.setSize)

    reaction(() => this.opened, opened => this.focus())
  }

  @action
  close() {
    this.repository.clear()
  }

  cycleIllust(reversion: boolean) {
    this.repository.cycle(reversion)
  }

  @action
  cycleFit() {
    this.fit = (this.fit + 1) % 3
    this.services.storage.store('fit', this.fit)
  }

  @action
  cycleSpread() {
    this.spread = (this.spread + 1) % 3
    this.services.storage.store('spread', this.spread)
  }

  @action
  toggleForcedSpread() {
    this.forcedSpread = !this.forcedSpread
    this.services.storage.store('forcedSpread', this.forcedSpread)
  }

  @action
  setPadding(padding: number) {
    this.padding = padding
    this.services.storage.store('padding', this.padding)
  }

  @action
  setFrame(frame: HTMLElement | null) {
    if (this.frame) {
      this.observer.unobserve(this.frame)
      this.frame = null
    }
    if (frame) {
      this.observer.observe(frame)
      this.frame = frame
      this.setSize(frame.getBoundingClientRect())
    }
  }

  @action.bound
  setSize({ width, height }: Size) {
    this.width = width
    this.height = height
  }

  calcScale(imageSize: Size) {
    if (this.fit === Fit.NONE) {
      return 1
    }

    const scaleX = this.cell.width / imageSize.width

    if (this.fit === Fit.COVER) {
      return Math.min(scaleX, 1)
    }

    const scaleY = this.cell.height / imageSize.height

    return Math.min(scaleX, scaleY, 1)
  }

  private focus() {
    requestAnimationFrame(() => {
      if (this.frame) {
        this.frame.focus()
      }
    })
  }
}
