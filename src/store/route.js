// @flow
import {observable, computed, reaction} from 'mobx'
import type Illust from '../entity/illust'

export class Route {

  @observable.ref element: ?HTMLAnchorElement;
  @observable.ref illust: ?Illust;

  constructor() {
    this.element = undefined
    this.illust = undefined
  }

  @computed get opened(): boolean {
    return !!this.element
  }

  reset() {
    this.element = undefined
    this.illust = undefined
  }

  setElement(element: HTMLAnchorElement) {
    this.element = element
    this.illust = undefined
  }

  setIllust(illust: Illust) {
    this.illust = illust
  }

  onChange(effect: (illust: Illust) => any) {
    return reaction(() => this.illust, illust => {
      if (illust) { effect(illust) }
    })
  }
}

export default new Route()
