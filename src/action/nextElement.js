// @flow
import Action from './interface'
import route, {type RouteUseCase} from '../useCase/route'

export class NextElement extends Action {
  route: RouteUseCase;

  constructor(route: RouteUseCase) {
    super()

    this.route = route

    this.description = '次の作品'
    this.key = 'j'
    this.type = 'keydown'
    this.repeat = false
  }

  execute = () => {
    this.route.step(1)
  };
}

export default new NextElement(route)
