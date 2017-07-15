// @flow
import http, {type Http} from '../service/http'
import Illust from '../entity/illust'
import detailFactory from './detailFactory'
import bookmarkFactory from './bookmarkFactory'
import imageFactory from './imageFactory'
import ugoiraFactory from './ugoiraFactory'
import type Image from '../entity/image'
import type Ugoira from '../entity/ugoira'

type Response = {
  error: boolean,
  message: string,
  body: Dict<IllustSource>,
}

const URL = '/rpc/index.php?mode=get_illust_detail_by_ids&illust_ids='

export class IllustFactory {
  http: Http;

  constructor(http: Http) {
    this.http = http
  }

  create(src: IllustSource): Illust {
    let images: Image[] | Ugoira[]
    if (src.illustType === '2') {
      images = ugoiraFactory.create(src)
    } else if (src.isMultiple) {
      images = imageFactory.createMultiple(src)
    } else {
      images = imageFactory.createSingle(src)
    }

    return new Illust(
      detailFactory.create(src),
      bookmarkFactory.create(src),
      images,
      src,
    )
  }

  async fromServer(id: string) {
    const url = `${URL}${id}`
    const response: Response = await this.http.getJSON(url)
    if (response.error) {
      throw new Error(`${response.message}`)
    }
    const src = response.body[id]

    return this.create(src)
  }
}

export default new IllustFactory(http)
