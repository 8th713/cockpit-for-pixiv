import { ThreadPool } from './infra/ThreadPool'
import { HttpCliant } from './infra/HttpCliant'
import { Scraper } from './infra/Scraper'
import { ClientService } from '../types'
import {
  IllustAttrs,
  DetailsAttrs,
  BookmarkAttrs,
  TagAttrsDictionary
} from '../store'

interface RPCResponse {
  error: boolean
  message: string
}

interface IllustDetailByIdsResponse extends RPCResponse {
  body: {
    [id: string]: IllustAttrs
  }
}

interface PageDetail extends RPCResponse {
  body: DetailsAttrs
}

export class PixivClientService implements ClientService {
  private pool = new ThreadPool(3)
  private cliant = new HttpCliant()
  private scraper = new Scraper()

  private id: string
  private token: string

  constructor(data: PixivGlobalData) {
    if (!data.loggedIn) {
      throw new Error('ログインしてください')
    }
    this.id = data.userId
    this.token = data.token
  }

  getIllust(id: string) {
    const url = `/rpc/index.php?mode=get_illust_detail_by_ids&illust_ids=${id}`

    return this.pool.submit(async () => {
      const response = await this.cliant.getJSON<IllustDetailByIdsResponse>(url)

      if (response.error) {
        throw new Error(response.message)
      }
      const attrs = response.body[id]

      return {
        isSelf: this.id === attrs.userId,
        ...attrs
      }
    })
  }

  getIllustPage(id: string) {
    const url = `/ajax/illust/${id}`

    return this.pool.submit(async () => {
      const response = await this.cliant.getJSON<PageDetail>(url)

      if (response.error) {
        throw new Error(response.message)
      }

      return response.body
    })
  }

  getBookmarkPage(id: string) {
    const url = `/bookmark_add.php?type=illust&illust_id=${id}`

    return this.pool.submit(async () => {
      const doc = await this.cliant.getDoc(url)

      return this.scraper.scrapeBookmarkPage(doc)
    })
  }

  getImage(url: string) {
    return this.pool.submit(() => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = document.createElement('img')

        image.addEventListener('load', () => {
          resolve(image)
        })
        image.addEventListener('error', () => {
          reject(new Error('Could not acquire image.'))
        })
        image.src = url
      })
    })
  }

  getUserTag() {
    const { token } = this
    const url = `/rpc/illust_bookmark_tags.php?attributes=lev%2Ctotal&tt=${token}`

    return this.pool.submit(async () => {
      return await this.cliant.getJSON<TagAttrsDictionary>(url)
    })
  }

  likeIt(id: string) {
    const body = {
      mode: 'save',
      i_id: id,
      u_id: this.id,
      tt: this.token,
      qr: 0,
      score: 10
    }

    return this.pool.submit(async () => {
      const response = await this.cliant.postJSON<RPCResponse>(
        '/rpc_rating.php',
        body
      )

      if (response.error) {
        throw new Error(response.message)
      }
    })
  }

  bookmark(id: string, data: BookmarkAttrs): Promise<void> {
    const body = {
      mode: 'save_illust_bookmark',
      illust_id: id,
      ...data,
      tt: this.token
    }

    return this.pool.submit(async () => {
      const response = await this.cliant.postJSON<RPCResponse>(
        '/rpc/index.php',
        body
      )

      if (response.error) {
        throw new Error(response.message)
      }
    })
  }
}
