// @flow
import http, {type Http} from '../service/http'
import scraper, {type Scraper} from '../service/scraper'
import Bookmark from '../entity/bookmark'
import account, {type Account} from '../store/account'

const URL = '/bookmark_add.php?type=illust&illust_id='
const RPC = '/rpc/index.php'

export class BookmarkFactory {
  http: Http;
  scraper: Scraper;
  account: Account;

  constructor(http: Http, scraper: Scraper, account: Account) {
    this.http = http
    this.scraper = scraper
    this.account = account
  }

  create(src: IllustSource): Bookmark {
    return new Bookmark(this.account, src)
  }

  async fetch(id: string): Promise<BookmarkSource> {
    const url = `${URL}${id}`
    const doc = await this.http.getDoc(url)
    const data = this.scraper.scrapeBookmarkPage(doc)

    return data
  }

  bookmark(id: string, data: BookmarkSource): Promise<void>  {
    type Response = {
      error: boolean,
      message: string,
    };

    return this.http.postJSON(RPC, {
      mode: 'save_illust_bookmark',
      illust_id: id,
      tt: this.account.token,
      ...data,
    }).then((res: Response) => {
      if (res.error) {
        throw new Error(res.message)
      }
    })
  }
}

export default new BookmarkFactory(http, scraper, account)
