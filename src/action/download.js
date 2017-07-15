// @flow
import {computed} from 'mobx'
import Action from './interface'
import route, {type Route} from '../store/route'
import useCase, {type IllustUseCase} from '../useCase/illust'

export class Download extends Action {
  route: Route;
  useCase: IllustUseCase;

  constructor(route: Route, useCase: IllustUseCase) {
    super()
    this.route = route
    this.useCase = useCase
  }

  category = 'illust'
  description = 'ダウンロード'
  key = 'd'
  type = 'keydown'
  repeat = false
  label = 'ダウンロード(D)'
  icon = 'file_download'

  @computed get disabled(): boolean {
    if (this.route.illust) {
      return this.route.illust.detail.isSelf
    }
    return true
  }

  execute = () => {
    this.useCase.download()
  };
}

export default new Download(route, useCase)
