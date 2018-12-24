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

export interface DownloadAddonPayload {
  title: string
  author: string
  type: 'image' | 'comic' | 'ugoira'
  images: Array<{ src: string; alt: string }>
}
