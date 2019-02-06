declare var GM_info: {
  script: {
    description: string
    excludes: string[]
    includes: string[]
    matches: string[]
    name: string
    namespace: string
    resources: Object
    'run-at': string
    unwrap: boolean
    version: string
    homepage: string
    supportURL: string
  }
  scriptMetaStr: string
  scriptWillUpdate: boolean
  version: string
}

declare var unsafeWindow: Window & {
  JSZip: import('jszip')
}

interface GMXMLHttpRequestOptions {
  method: string
  url: string
  headers?: Object
  data?: string
  binary?: boolean
  timeout?: number
  context?: any
  responseType?: 'blob' | 'arraybuffer' | 'json'
  overrideMimeType?: string
  anonymous?: boolean
  username?: string
  password?: string
  onabort?: (response: GMXMLHttpRequestResponse) => any
  onerror?: (response: GMXMLHttpRequestResponse) => any
  onload?: (response: GMXMLHttpRequestResponse) => any
  onreadystatechange?: (response: GMXMLHttpRequestResponse) => any
  ontimeout?: (response: GMXMLHttpRequestResponse) => any
}

interface GMXMLHttpRequestResponse {
  readyState: number
  response: any
  responseHeaders: string
  responseText: string
  status: number
  statusText: string
  context: any
  finalUrl: string
}

declare function GM_xmlhttpRequest(
  options: GMXMLHttpRequestOptions
): GMXMLHttpRequestResponse
