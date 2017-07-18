// @flow
import {computed} from 'mobx'
import {type Viewer} from '../store/viewer'

export default class Size {
  viewer: Viewer;
  naturalWidth: number;
  naturalHeight: number;

  constructor(viewer: Viewer, dimensions: Dimensions) {
    this.viewer = viewer
    this.naturalWidth = dimensions.width
    this.naturalHeight = dimensions.height
  }

  @computed get scale(): number {
    const {viewer} = this

    if (viewer.resize) {
      const scaleX = Size.calcScale(viewer.width, this.naturalWidth)
      const scaleY = Size.calcScale(viewer.height, this.naturalHeight)

      return Math.min(scaleX, scaleY)
    }
    return 1
  }

  @computed get width(): number {
    return this.naturalWidth * this.scale
  }

  @computed get height(): number {
    return this.naturalHeight * this.scale
  }

  update(img: HTMLImageElement) {
    this.naturalWidth = img.naturalWidth
    this.naturalHeight = img.naturalHeight
  }

  static calcScale(a: number, b: number): number {
    return a < b ? (a / b) : 1
  }
}
