import { Illust } from './resources'

export type ConnectionRequestAction = {
  type: 'CONNECTION-REQUEST'
  id: string
}
export type ConnectionSuccessAction = {
  type: 'CONNECTION-SUCCESS'
}

export type DownloadRequestAction = {
  type: 'DOWNLOAD_REQUEST'
  payload: Illust
}

export type DownloadAaction = ConnectionSuccessAction | DownloadRequestAction
