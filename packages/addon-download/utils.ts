import { DownloadAaction } from '../core/interfaces'

export function isValidAction(action: any): action is DownloadAaction {
  return action && typeof action === 'object' && typeof action.type === 'string'
}

export function injectScript(src: string) {
  const script = document.createElement('script')

  script.src = src
  document.body.appendChild(script)
}

export function getExtension(url: string): string {
  const index = url.lastIndexOf('.')

  return url.slice(index + 1)
}

export function getBlob(url: string) {
  return new Promise<Blob>((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      responseType: 'blob',
      method: 'GET',
      headers: { referer: url },
      onload: xhr => resolve(xhr.response),
      onerror: reject
    })
  })
}

export function saveAs(blob: Blob, name: string) {
  const element = document.createElement('a')

  element.style.display = 'none'
  element.href = URL.createObjectURL(blob)
  element.download = name
  element.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(element.href)
  }, 100)
}
