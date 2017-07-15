// @flow
import http, {type Http} from '../service/http'
import scraper, {type Scraper} from '../service/scraper'
import Detail, {type DetailPartial} from '../entity/detail'
import account, {type Account} from '../store/account'
import tagFactory from './tagFactory'

const URL = '/member_illust.php?mode=medium&illust_id='
const LIKE_IT = '/rpc_rating.php'

export class DetailFactory {
  http: Http;
  scraper: Scraper;
  account: Account;

  constructor(http: Http, scraper: Scraper, account: Account) {
    this.http = http
    this.scraper = scraper
    this.account = account
  }

  create(src: IllustSource): Detail {
    return new Detail(this.account, src)
  };

  async fetch(id: string): Promise<DetailPartial> {
    const url = `${URL}${id}`
    const doc = await this.http.getDoc(url)
    const data: DetailSource = this.scraper.scrapeIllustPage(doc)
    const {date, viewCount, rateCount, caption, tags: TagList} = data
    const tags = tagFactory.fromArray(TagList)

    return {date, viewCount, rateCount, caption, tags}
  }

  likeIt(id: string): Promise<void> {
    type Response = {
      error: boolean,
      message: string,
    };

    return this.http.postJSON(LIKE_IT, {
      mode: 'save',
      i_id: id,
      u_id: this.account.id,
      qr: 0,
      score: 10,
      tt: this.account.token,
    }).then((res: Response) => {
      if (res.error) {
        throw new Error(res.message)
      }
    })
  }
}

export default new DetailFactory(http, scraper, account)
