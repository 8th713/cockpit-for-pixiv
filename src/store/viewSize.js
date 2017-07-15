// @flow
import {observable} from 'mobx'

export class ViewSize {
  @observable width: number;
  @observable height: number;

  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }

  update() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
}

export default new ViewSize()
