export function isSuccess(data: any): data is Addon.ConnectionSuccess {
  const type: Addon.ConnectionSuccess['type'] = 'CFP-ADDON-CONNECTION-SUCCESS'

  return data && data.type === type
}

export function isDownload(data: any): data is Addon.DownloadRequest {
  const method: Addon.DownloadRequest['method'] = 'DOWNLOAD'

  return data && data.method === method && data.args?.info && data.args?.images
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
      onload: (xhr) => resolve(xhr.response),
      onerror: reject,
    })
  })
}

export function saveAs(blob: Blob, name: string) {
  const element = document.createElement('a')
  const url = URL.createObjectURL(blob)

  element.style.display = 'none'
  element.href = url
  element.download = name
  element.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(element.href)
  }, 100)
}
