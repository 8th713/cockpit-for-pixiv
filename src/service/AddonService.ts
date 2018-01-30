import { AddonService as IAddonService } from '../types'

interface Action {
  type: 'cockpit-addon-connect'
  name: string
}

export class AddonService implements IAddonService {
  private addons: Map<string, MessagePort>

  constructor() {
    this.addons = new Map()

    window.addEventListener('message', event => {
      const port: MessagePort = event.ports[0]
      const { data } = event

      if (event.origin !== location.origin || !port || !this.isAction(data)) {
        return
      }
      this.addons.set(data.name, port)
      port.postMessage('connected')
    })
  }

  private isAction(action: any): action is Action {
    return (
      action &&
      action.type === 'cockpit-addon-connect' &&
      typeof action.name === 'string'
    )
  }

  getPort(key: string) {
    return this.addons.get(key)
  }
}
