declare namespace Addon {
  interface ConnectionRequest {
    type: 'CFP-ADDON-CONNECTION-REQUEST'
    key: string
    methods: string[]
  }

  interface ConnectionSuccess {
    type: 'CFP-ADDON-CONNECTION-SUCCESS'
  }

  interface Action {
    method: string
    payload: any
  }

  interface DownloadRequest extends Action {
    method: 'DOWNLOAD'
    payload: {
      info: Pixiv.IllustInfo
      images: Pixiv.Pages
    }
  }
}
