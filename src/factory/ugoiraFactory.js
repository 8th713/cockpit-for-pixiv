// @flow
import Ugoira from '../entity/ugoira'
import sizeFactory, {type SizeFactory} from './sizeFactory'

export class UgoiraFactory {
  size: SizeFactory;

  constructor(size: SizeFactory) {
    this.size = size
  }

  create(src: IllustSource): Ugoira[] {
    const width = Number(src.illustWidth)
    const height = Number(src.illustHeight)
    const ugoira: UgoiraSource = JSON.parse(src.ugoiraMetaFullscreen)

    ugoira.src = src.url.ugoira600x600.replace('600x600', '1920x1080')
    ugoira.alt = src.illustTitle
    return [new Ugoira(
      this.size.create({width, height}),
      ugoira,
    )]
  }
}

export default new UgoiraFactory(sizeFactory)
