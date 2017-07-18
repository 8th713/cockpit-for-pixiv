// @flow
import {action} from 'mobx'
import http, {type Http} from '../service/http'
import type Image from '../entity/image'

export class ImageUseCase {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  @action.bound load(image: Image) {
    if (image.isFetched) { return }
    if (image.isLoading) { return }

    image.load()
    this.http.getImage(image.src)
      .then(src => image.loadSuccess(src))
      .catch(() => image.loadFailure())
  }
}

export default new ImageUseCase(http)
