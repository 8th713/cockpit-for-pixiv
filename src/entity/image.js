// @flow
import {observable, computed} from 'mobx'
import type Size from './size'

export default class Image {
  src: string;
  alt: string;
  size: Size;
  @observable isLoading: boolean;
  @observable isFetched: boolean;

  constructor(size: Size, src: ImageSource) {
    Object.assign(this, src)
    this.size = size
    this.isLoading = false
    this.isFetched = false
  }

  @computed get canLoad(): boolean {
    return !this.isFetched && !this.isLoading
  }

  load() {
    this.isLoading = true
  }

  loadSuccess(img: HTMLImageElement) {
    this.size.update(img)
    this.isFetched = true
    this.isLoading = false
  }

  loadFailure() {
    this.isFetched = false
    this.isLoading = false
  }
}
