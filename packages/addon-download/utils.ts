interface ConnectionSuccess {
  type: 'CFP-ADDON-CONNECTION-SUCCESS'
  key: string
  methods: string[]
}

interface DownloadRequest {
  type: 'DOWNLOAD'
  payload: {
    work: Pixiv.Illust
    pages: Pixiv.Pages
  }
}

export const isSuccess = (data: any): data is ConnectionSuccess =>
  data && data.type === 'CFP-ADDON-CONNECTION-SUCCESS'

export const isDownload = (data: any): data is DownloadRequest => {
  return (
    data &&
    data.type === 'DOWNLOAD' &&
    data.payload?.work &&
    data.payload?.pages
  )
}

export const injectScript = (src: string) => {
  const script = document.createElement('script')

  script.src = src
  document.body.appendChild(script)
}

export const getExtension = (url: string): string => {
  const index = url.lastIndexOf('.')

  return url.slice(index + 1)
}

export const getBlob = (url: string) => {
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

export const saveAs = (blob: Blob, name: string) => {
  const element = document.createElement('a')

  element.style.display = 'none'
  element.href = URL.createObjectURL(blob)
  element.download = name
  element.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(element.href)
  }, 100)
}
