// @flow
import {observable, computed} from 'mobx'
import type Size from './size'

export default class Image {
  src: string;
  alt: string;
  size: Size;
  @observable isLoading: boolean;
  @observable isFetched: boolean;
  @observable isError: boolean;

  constructor(size: Size, src: ImageSource) {
    Object.assign(this, src)
    this.size = size
    this.isLoading = false
    this.isFetched = false
    this.isError = false
  }

  @computed get attrs(): ImageSource {
    const {src, alt} = this

    return {src, alt}
  }

  @computed get canLoad(): boolean {
    return !this.isFetched && !this.isLoading
  }

  load() {
    this.isLoading = true
    this.isError = false
  }

  loadSuccess(img: HTMLImageElement) {
    this.size.update(img)
    this.isFetched = true
    this.isLoading = false
    this.isError = false
  }

  loadFailure() {
    this.isFetched = false
    this.isLoading = false
    this.isError = true
  }
}
