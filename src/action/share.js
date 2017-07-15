// @flow
import {computed} from 'mobx'
import Action from './interface'
import route, {type Route} from '../store/route'
import useCase, {type IllustUseCase} from '../useCase/illust'

export class Share extends Action {
  route: Route;
  useCase: IllustUseCase;

  constructor(route: Route, useCase: IllustUseCase) {
    super()
    this.route = route
    this.useCase = useCase
  }

  category = 'illust'
  description = 'シェア'
  key = 's'
  type = 'keydown'
  repeat = false
  label = 'シェア(S)'
  icon = 'share'

  @computed get disabled(): boolean {
    if (this.route.illust) {
      return this.route.illust.detail.isSelf
    }
    return true
  }

  execute = () => {
    this.useCase.share()
  };
}

export default new Share(route, useCase)
