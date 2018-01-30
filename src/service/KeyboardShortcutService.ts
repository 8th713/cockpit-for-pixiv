import { ShortcutService, KeyBinding, KeyMap } from '../types'

const IGNORED = 'input, textarea, select'

export class KeyboardShortcutService implements ShortcutService {
  private items: KeyMap

  constructor() {
    this.items = {}

    window.addEventListener('keydown', this.handleKeyEvent)
  }

  private handleKeyEvent = (event: KeyboardEvent) => {
    const target = event.target as Element

    if (event.repeat || target.matches(IGNORED)) {
      return
    }

    const { handler } = this.items[event.key] || { handler: undefined }

    if (handler) {
      handler(event)
    }
  }

  register(binding: KeyBinding) {
    if (this.items[binding.key]) {
      throw new Error('Conflict key')
    }
    this.items[binding.key] = binding
  }

  getList(): KeyBinding[] {
    return Object.keys(this.items)
      .map(key => this.items[key])
      .sort((a, b) => {
        const x = a.priority || 0
        const y = b.priority || 0

        if (x < y) {
          return 1
        } else if (x > y) {
          return -1
        }
        return 0
      })
  }
}
