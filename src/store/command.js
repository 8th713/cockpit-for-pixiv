// @flow
/*global $ */
import type Action from '../action/interface'

const IGNORED = 'INPUT, TEXTAREA, SELECT'
const EVENT_TYPE = 'keydown.cockpit keypress.cockpit keyup.cockpit'

export class Command {
  items: Action[];

  constructor() {
    this.items = []
    $(window).on(EVENT_TYPE, this.handleKeyEvent)
  }

  get viewer(): Action[] {
    return this.items.filter(def => def.category === 'viewer')
  }

  get illust(): Action[] {
    return this.items.filter(def => def.category === 'illust')
  }

  get help(): Action[] {
    return this.items.filter(def => def.category === 'help')
  }

  handleKeyEvent = (event: JQueryEventObject) => {
    if ($(event.target).is(IGNORED)) { return }

    for (const action of this.items) {
      if (this.test((event.originalEvent: any), action)) {
        action.execute()
        break
      }
    }
  };

  test(event: KeyboardEvent, action: Action): boolean {
    return (
      event.key === action.key &&
      event.type === action.type &&
      event.repeat === action.repeat
    )
  }

  register(action: Action) {
    this.items.push(action)
  }
}

export default new Command()
