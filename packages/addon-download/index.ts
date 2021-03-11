import { download } from './download'
import { injectScript, isDownload, isSuccess } from './utils'

const LABEL = `${GM_info.script.name} - ${GM_info.script.version}`
const JSZIP_CDN = 'https://unpkg.com/jszip@3.6.0/dist/jszip.min.js'
const channel = new MessageChannel()
const { port1, port2 } = channel

port1.addEventListener('message', (event) => {
  if (isSuccess(event.data)) {
    injectScript(JSZIP_CDN)
    return
  }
  if (isDownload(event.data)) {
    try {
      const { work, pages } = event.data.payload

      download(work, pages)
    } catch (err) {
      console.error(LABEL + ': Download error', err)
    }
    return
  }
  console.error(LABEL + ': Unknown action', event.data)
})

port1.start()

setTimeout(() => {
  window.postMessage(
    {
      type: 'CFP-ADDON-CONNECTION-REQUEST',
      key: 'DOWNLOAD',
      methods: ['DOWNLOAD'],
    },
    location.origin,
    [port2]
  )
}, 500)
