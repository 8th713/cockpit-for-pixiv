interface Action {
  type: string
  payload?: any
}

interface ConnectionRequest {
  type: typeof REQUEST
  key: string
  methods: string[]
}

interface Addon {
  port: MessagePort
  methods: string[]
}

const REQUEST = 'CFP-ADDON-CONNECTION-REQUEST'
const SUCCESS = 'CFP-ADDON-CONNECTION-SUCCESS'

export const createAddonStore = () => {
  const addons = new Map<string, Addon>()
  const isConnected = (key: string) => addons.has(key)
  const dispatch = (key: string, action: Action) => {
    const addon = addons.get(key)

    if (!addon) throw new Error(`Add-on ${key} is not installed.`)

    const { methods, port } = addon

    if (!methods.includes(action.type))
      throw new Error(`Action ${action.type} does not exist in the ${key}.`)

    port.postMessage(action)
  }

  window.addEventListener('message', (e) => {
    const port = e.ports[0]

    if (!isFromOrigin(e.origin)) return
    if (!isRequest(e.data)) return

    const { key, methods } = e.data

    addons.set(key, { port, methods })
    port.postMessage({ type: SUCCESS })
    console.log(`Registered a ${key} add-on`)
  })

  return { isConnected, dispatch }
}

const isFromOrigin = (from: string) => location.origin === from
const isRequest = (data: any): data is ConnectionRequest =>
  data && data.type === REQUEST
