// @flow
import {computed} from 'mobx'
import type Size from './size'

export default class Ugoira {
  src: string;
  alt: string;
  mime_type: string;
  frames: UgoiraFrame[];
  size: Size;

  constructor(size: Size, src: UgoiraSource) {
    const {width, height, ...rest} = src

    this.size = size
    Object.assign(this, rest)
  }

  @computed get attrs(): ImageSource {
    const {src, alt} = this

    return {src, alt}
  }
}
