import { ConnectionRequestAction, DownloadAaction } from '../core/interfaces'
import { download } from './download'
import { injectScript, isValidAction } from './utils'

const LABEL = `${GM_info.script.name} - ${GM_info.script.version}`
const JSZIP_CDN = 'https://unpkg.com/jszip@3.1.5/dist/jszip.min.js'
const request: ConnectionRequestAction = {
  type: 'CONNECTION-REQUEST',
  id: 'download'
}
const channel = new MessageChannel()
const { port1, port2 } = channel

port1.addEventListener('message', event => {
  const action: DownloadAaction = event.data
  if (isValidAction(action) === false) return

  switch (action.type) {
    case 'CONNECTION-SUCCESS':
      injectScript(JSZIP_CDN)
      return
    case 'DOWNLOAD_REQUEST': {
      download(action.payload)
      return
    }
    default: {
      console.error(LABEL + ' Unknown Action', action)
    }
  }
})
port1.start()
window.postMessage(request, location.origin, [port2])
