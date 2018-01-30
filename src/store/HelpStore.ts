import { observable, action } from 'mobx'
import { ShortcutService } from '../types'

export class HelpStore {
  private shortcut: ShortcutService

  name = GM_info.script.name
  version = GM_info.script.version
  productURL = GM_info.script.homepage
  supportURL = GM_info.script.supportURL

  @observable opened: boolean = false

  get keyList() {
    return this.shortcut.getList()
  }

  constructor(shortcut: ShortcutService) {
    this.shortcut = shortcut
  }

  @action
  open() {
    this.opened = true
  }

  @action
  close() {
    this.opened = false
  }

  toggle() {
    this.opened ? this.close() : this.open()
  }
}
