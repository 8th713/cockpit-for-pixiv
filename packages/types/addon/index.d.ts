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
    args: any
  }

  interface DownloadRequest extends Action {
    method: 'DOWNLOAD'
    args: {
      info: Pixiv.IllustInfo
      images: Pixiv.Images
    }
  }
}
