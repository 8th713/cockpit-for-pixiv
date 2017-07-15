// @flow
import Image from '../entity/image'
import sizeFactory, {type SizeFactory} from './sizeFactory'

export class ImageFactory {
  size: SizeFactory;

  constructor(size: SizeFactory) {
    this.size = size
  }

  createSingle(source: IllustSource): Image[] {
    const src = source.url.big
    const alt = source.illustTitle

    return [new Image(
      this.size.create({width: 0, height: 0}),
      {src, alt},
    )]
  }

  createMultiple(source: IllustSource): Image[] {
    const count = Number(source.illustPageCount)
    const baseTitle = source.illustTitle
    const baseURL = source.url.big
    const images: Image[] = []

    for (let i = 0; i < count; i++) {
      images.push(new Image(
        this.size.create({width: 0, height: 0}),
        {
          src: baseURL.replace('_p0', `_p${i}`),
          alt: `${baseTitle}(${i + 1}-${count})`,
        }
      ))
    }
    return images
  }
}

export default new ImageFactory(sizeFactory)
