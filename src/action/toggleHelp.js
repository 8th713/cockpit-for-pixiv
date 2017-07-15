// @flow
import Action from './interface'
import useCase, {type HelpUseCase} from '../useCase/help'

export class ToggleHelp extends Action {
  useCase: HelpUseCase;

  constructor(useCase: HelpUseCase) {
    super()
    this.useCase = useCase
  }

  category = 'help';
  description = 'ヘルプ';
  key = '?';
  type = 'keydown';
  repeat = false;
  label = 'ヘルプ(?)';
  icon = 'help';

  execute = () => {
    this.useCase.toggle()
  };
}

export default new ToggleHelp(useCase)
