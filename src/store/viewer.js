// @flow
import {observable, computed, reaction} from 'mobx'
import storage, {type Storage} from '../service/storage'
import viewSize, {type ViewSize} from './viewSize'
import route, {type Route} from './route'

const MARGIN = 20
const ASIDE_WIDTH = 300

export class Viewer {
  storage: Storage;

  viewSize: ViewSize;
  route: Route;

  @observable resize: boolean;
  @observable sidePanel: boolean;

  constructor(storage: Storage, viewSize: ViewSize, route: Route) {
    this.storage = storage

    this.viewSize = viewSize
    this.route = route

    this.resize = storage.load('resize', true)
    this.sidePanel = storage.load('sidePanel', false)
  }

  @computed get width(): number {
    if (this.sidePanel) {
      return this.viewSize.width - ASIDE_WIDTH - MARGIN
    }
    return this.viewSize.width - MARGIN
  }

  @computed get height(): number {
    return this.viewSize.height - MARGIN
  }

  toggleFit() {
    this.resize = !this.resize
    this.storage.store('resize', this.resize)
  }

  toggleSidePanel() {
    this.sidePanel = !this.sidePanel
    this.storage.store('sidePanel', this.sidePanel)
  }

  onOpenSidePanel(effect: () => any) {
    return reaction(() => this.sidePanel, (opened) => {
      if (opened) { effect() }
    })
  }
}

export default new Viewer(storage, viewSize, route)
