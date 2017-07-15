// @flow
import Size from '../entity/size'
import viewer, {type Viewer} from '../store/viewer'

export class SizeFactory {
  viewer: Viewer;

  constructor(viewer: Viewer) {
    this.viewer = viewer
  }

  create(dimensions: Dimensions): Size {
    return new Size(this.viewer, dimensions)
  }
}

export default new SizeFactory(viewer)
