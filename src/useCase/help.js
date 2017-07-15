// @flow
import {action} from 'mobx'
import help, {type Help} from '../store/help'

export class HelpUseCase {
  help: Help;

  constructor(help: Help) {
    this.help = help
  }

  @action.bound close() {
    this.help.toggle(false)
  }

  @action.bound toggle() {
    this.help.toggle()
  };
}

export default new HelpUseCase(help)
