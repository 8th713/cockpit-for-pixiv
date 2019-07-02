import { LABEL } from '../constants'
import { ConnectionRequestAction } from '../interfaces'

type Action = {
  type: string
  payload?: any
}

export type AddonStore = ReturnType<typeof createAddonStore>

export function createAddonStore() {
  let ports = new Map<string, MessagePort>()

  function handleConnect(event: MessageEvent) {
    const { origin, data } = event

    if (origin !== location.origin) return
    if (isConnectionRequest(data)) {
      console.log(`${LABEL} Addon connected`, data)
      const port = event.ports[0]
      ports.set(data.id, port)
      port.postMessage({ type: 'CONNECTION-SUCCESS' })
    }
  }
  function dispatch(key: string, action: Action) {
    const port = ports.get(key)

    if (port) {
      port.postMessage(action)
    }
  }
  function isConnected(key: string) {
    return ports.has(key)
  }

  window.addEventListener('message', handleConnect)

  return { isConnected, dispatch }
}

function isConnectionRequest(action: any): action is ConnectionRequestAction {
  return (
    action &&
    action.type === 'CONNECTION-REQUEST' &&
    typeof action.id === 'string'
  )
}
