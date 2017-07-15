// @flow
import type Size from './size'

export default class Ugoira {
  src: string;
  mime_type: string;
  frames: UgoiraFrame[];
  size: Size;

  constructor(size: Size, src: UgoiraSource) {
    const {width, height, ...rest} = src

    this.size = size
    Object.assign(this, rest)
  }
}
