// @flow
import http, {type Http} from '../service/http'
import Tag from '../entity/tag'
import account, {type Account} from '../store/account'
import editor, {type Editor} from '../store/editor'

const URL = '/rpc/illust_bookmark_tags.php?attributes=lev%2Ctotal&tt='

export class TagFactory {
  http: Http;
  account: Account;
  editor: Editor;

  constructor(http: Http, account: Account, editor: Editor) {
    this.http = http
    this.account = account
    this.editor = editor
  }

  fromArray(arr: IllustTag[]): Tag[] {
    return arr.map(src => {
      return new Tag(this.editor, src.name, src.url)
    })
  }

  fromDict(dict: Dict<TagSource>): Tag[] {
    return Object.keys(dict).reduce((acc, name) => {
      const src = dict[name]

      acc.push(new Tag(this.editor, name, undefined, src))
      return acc
    }, [])
  }

  async fetch(): Promise<Tag[]> {
    const {token} = this.account
    const url = `${URL}${token}`
    const response = await this.http.getJSON(url)

    return this.fromDict(response)
  }
}

export default new TagFactory(http, account, editor)
