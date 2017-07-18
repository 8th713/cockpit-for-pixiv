// @flow
import Action from './interface'
import route, {type RouteUseCase} from '../useCase/route'

export class PreviousElement extends Action {
  route: RouteUseCase;

  constructor(route: RouteUseCase) {
    super()

    this.route = route

    this.description = '前の作品'
    this.key = 'k'
    this.type = 'keydown'
    this.repeat = false
  }

  execute = () => {
    this.route.step(-1)
  };
}

export default new PreviousElement(route)
