// @flow
/*global $, colon */
import {action} from 'mobx'
import route, {type Route} from '../store/route'
import viewer, {type Viewer} from '../store/viewer'
import editor, {type Editor} from '../store/editor'
import detailFactory, {type DetailFactory} from '../factory/detailFactory'
import type Illust from '../entity/illust'

const EVENT_TYPE = 'resize.cockpit'

export class ViewerUseCase {
  route: Route;
  viewer: Viewer;
  editor: Editor;
  factory: DetailFactory;

  constructor(
    route: Route,
    viewer: Viewer,
    editor: Editor,
    factory: DetailFactory
  ) {
    this.route = route
    this.viewer = viewer
    this.editor = editor
    this.factory = factory

    $(window).on(EVENT_TYPE, colon.debounce(this.resize, 100))
    route.onChange(this.handleChange)
    viewer.onOpenSidePanel(this.handleOpen)
    editor.onOpen(this.handleOpen)
  }

  @action.bound resize() {
    this.viewer.viewSize.update()
  }

  @action.bound toggleFit() {
    this.viewer.toggleFit()
  }

  @action.bound toggleSidePanel() {
    this.viewer.toggleSidePanel()
  }

  @action.bound load(illust: Illust) {
    const {detail} = illust

    if (detail.canLoad) {
      detail.load()
      this.factory.fetch(detail.id)
        .then(src => detail.loadSuccess(src))
        .catch(() => detail.loadFailure())
    }
  }

  handleChange = (illust: Illust) => {
    if (this.viewer.sidePanel || this.editor.opened) {
      this.load(illust)
    }
  };

  handleOpen = () => {
    if (this.route.illust) {
      this.load(this.route.illust)
    }
  }
}

export default new ViewerUseCase(route, viewer, editor, detailFactory)
