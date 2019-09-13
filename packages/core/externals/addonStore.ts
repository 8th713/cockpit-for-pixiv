import { LABEL } from '../constants'

type Action = {
  type: string
  payload?: any
}

export type AddonStore = ReturnType<typeof createAddonStore>

export const createAddonStore = () => {
  let ports = new Map<string, MessagePort>()

  const handleConnect = (event: MessageEvent) => {
    const { origin, data } = event

    if (origin !== location.origin) return
    if (isConnectionRequest(data)) {
      console.log(`${LABEL} Addon connected`, data)
      const port = event.ports[0]
      ports.set(data.id, port)
      port.postMessage({ type: 'CONNECTION-SUCCESS' })
    }
  }
  const dispatch = (key: string, action: Action) => {
    const port = ports.get(key)

    if (port) port.postMessage(action)
  }
  const isConnected = (key: string) => ports.has(key)

  window.addEventListener('message', handleConnect)

  return { isConnected, dispatch }
}

const isConnectionRequest = (
  action: any
): action is CFPAddon.ConnectionRequestAction =>
  action &&
  action.type === 'CONNECTION-REQUEST' &&
  typeof action.id === 'string'
