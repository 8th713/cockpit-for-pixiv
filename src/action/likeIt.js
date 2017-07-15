// @flow
import {computed} from 'mobx'
import Action from './interface'
import route, {type Route} from '../store/route'
import useCase, {type IllustUseCase} from '../useCase/illust'

export class LikeIt extends Action {
  route: Route;
  useCase: IllustUseCase;

  constructor(route: Route, useCase: IllustUseCase) {
    super()
    this.route = route
    this.useCase = useCase
  }

  category = 'illust'
  description = 'いいね！'
  key = 'l'
  type = 'keydown'
  repeat = false
  label = 'いいね！(I)'
  icon = 'thumb_up'

  @computed get active(): boolean {
    if (this.route.illust) {
      return this.route.illust.detail.isRated
    }
    return false
  }

  @computed get disabled(): boolean {
    if (this.route.illust) {
      return this.route.illust.detail.isSelf
    }
    return true
  }

  execute = () => {
    this.useCase.likeIt()
  };
}

export default new LikeIt(route, useCase)
