interface AddonData {
  port: MessagePort
  methods: string[]
}

export function createAddonStore() {
  const addons = new Map<string, AddonData>()
  const isConnected = (key: string) => addons.has(key)
  const dispatch = (key: string, action: Addon.Action) => {
    const addon = addons.get(key)

    if (!addon) throw new Error(`Add-on ${key} is not installed.`)

    const { methods, port } = addon

    if (!methods.includes(action.method))
      throw new Error(`Action ${action.method} does not exist in the ${key}.`)

    port.postMessage(action)
  }

  window.addEventListener('message', (e) => {
    const port = e.ports[0]

    if (!isFromOrigin(e.origin)) return
    if (!isRequest(e.data)) return

    const { key, methods } = e.data

    addons.set(key, { port, methods })

    const successAction: Addon.ConnectionSuccess = {
      type: 'CFP-ADDON-CONNECTION-SUCCESS',
    }

    port.postMessage(successAction)
    console.log(`Registered a ${key} add-on`)
  })

  return { isConnected, dispatch }
}

function isFromOrigin(from: string) {
  return location.origin === from
}

function isRequest(data: any): data is Addon.ConnectionRequest {
  const actionType: Addon.ConnectionRequest['type'] =
    'CFP-ADDON-CONNECTION-REQUEST'

  return data && data.type === actionType
}
