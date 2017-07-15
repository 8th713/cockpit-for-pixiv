// @flow
import Action from './interface'
import useCase, {type ViewerUseCase} from '../useCase/viewer'

export class ToggleSidePanel extends Action {
  useCase: ViewerUseCase;

  constructor(useCase: ViewerUseCase) {
    super()
    this.useCase = useCase
  }

  category = 'viewer'
  description = '情報'
  key = 'i'
  type = 'keydown'
  repeat = false
  label = '情報(I)'
  icon = 'info'

  execute = () => {
    this.useCase.toggleSidePanel()
  };
}

export default new ToggleSidePanel(useCase)
