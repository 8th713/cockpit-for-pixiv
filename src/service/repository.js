// @flow
import illustFactory, {type IllustFactory} from '../factory/illustFactory'
import type Illust from '../entity/illust'

export class Repository {
  cache: Map<string, Illust>;
  factory: IllustFactory;

  constructor(factory: IllustFactory) {
    this.cache = new Map()
    this.factory = factory
  }

  getIllustId(element: HTMLAnchorElement): string {
    const params = new URLSearchParams(element.search)

    return params.get('illust_id')
  }

  async fetch(id: string) {
    const illust = await this.factory.fromServer(id)

    this.cache.set(id, illust)
    return illust
  };

  resolveByElement(element: HTMLAnchorElement): Promise<Illust> {
    const id = this.getIllustId(element)
    const illust = this.cache.get(id)

    if (illust) { return Promise.resolve(illust) }
    return this.fetch(id)
  }
}

export default new Repository(illustFactory)
