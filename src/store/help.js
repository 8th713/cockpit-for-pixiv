// @flow
/*global GM_info */
import {observable} from 'mobx'

export class Help {
  info: typeof GM_info.script;
  title: string;

  @observable opened: boolean;

  constructor(info: typeof GM_info) {
    this.info = info.script
    this.title = `${this.info.name} - ${this.info.version}`

    this.opened = false
  }

  toggle(force: boolean = !this.opened) {
    this.opened = force
  }
}

export default new Help(GM_info)
