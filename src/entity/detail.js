// @flow
import {observable, computed} from 'mobx'
import type Tag from './tag'
import type {Account} from '../store/account'

const restrictLabels = {
  '0': '公開',
  '1': 'マイピク',
  '2': '非公開',
};
const xRestrictLabels = {
  '0': '',
  '1': 'R-18',
  '2': 'R-18G',
};

export type DetailPartial = {
  date: string;
  viewCount: number;
  rateCount: number;
  caption: string;
  tags: Tag[];
}

export default class Detail {
  id: string;
  type: number;
  pageCount: string;
  restrict: string;
  xRestrict: string;
  @observable isRated: boolean;
  @observable date: string;
  @observable viewCount: number;
  @observable rateCount: number;
  @observable caption: string;
  @observable.ref tags: Tag[];

  isSelf: boolean;
  @observable isLoading: boolean;
  @observable isFetched: boolean;

  constructor(account: Account, src: IllustSource) {
    this.id = src.illustId
    this.type = Number(src.illustType)
    this.pageCount = `${src.illustPageCount}p`
    this.restrict = restrictLabels[src.illustRestrict]
    this.xRestrict = xRestrictLabels[src.illustXRestrict]
    this.isRated = src.isRated
    this.tags = []

    this.isSelf = account.id === src.userId
    this.isLoading = false
    this.isFetched = false
  }

  get description(): string {
    const {pageCount, restrict, xRestrict} = this
    const description = `${pageCount} / ${restrict} / ${xRestrict}`

    return description
  }

  @computed get canLoad(): boolean {
    return !this.isFetched && !this.isLoading
  }

  @computed get canRate(): boolean {
    return !this.isRated && !this.isSelf
  }

  load() {
    this.isLoading = true
  }

  loadSuccess(src: DetailPartial) {
    Object.assign(this, src)
    this.isLoading = false
    this.isFetched = true
  }

  loadFailure() {
    this.isFetched = false
    this.isLoading = false
  }

  rateUp() {
    const {isRated, rateCount} = this

    this.isRated = true
    if (this.isFetched) {
      this.rateCount += 1
    }

    return () => {
      this.isRated = isRated
      this.rateCount = rateCount
    }
  }
}
