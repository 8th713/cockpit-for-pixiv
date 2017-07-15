// @flow
import {action} from 'mobx'
import account, {type Account} from '../store/account'
import editor, {type Editor} from '../store/editor'
import tagFactory, {type TagFactory} from '../factory/tagFactory'

export class AccountUseCase {
  account: Account;
  factory: TagFactory;

  constructor(account: Account, editor: Editor, factory: TagFactory) {
    this.account = account
    this.factory = factory
    editor.onOpen(this.load)
  }

  @action.bound load() {
    const {account} = this

    if (account.canLoad) {
      account.load()
      this.factory.fetch()
        .then(src => account.loadSuccess(src))
        .catch(() => account.loadFailure())
    }
  }

  @action.bound sortBy(prop: 'name' | 'total') {
    if (this.account.sortBy === prop) {
      this.account.changeDirection()
    } else {
      this.account.changeOrder()
    }
  };
}

export default new AccountUseCase(account, editor, tagFactory)
