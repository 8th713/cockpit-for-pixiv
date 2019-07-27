declare namespace CFPAddon {
  type ConnectionRequestAction = {
    type: 'CONNECTION-REQUEST'
    id: string
  }

  type ConnectionSuccessAction = {
    type: 'CONNECTION-SUCCESS'
  }

  type DownloadRequestAction = {
    type: 'DOWNLOAD_REQUEST'
    payload: Pixiv.Illust
  }

  type DownloadAaction = ConnectionSuccessAction | DownloadRequestAction
}
