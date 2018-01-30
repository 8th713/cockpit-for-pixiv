import { observable, action } from 'mobx'
import { IllustAttrs } from './Illust'
import { Status } from '../../types'

interface UgoiraFrame {
  file: string
  delay: number
}

export class Ugoira {
  id: string
  src: string
  alt: string
  mime_type: string
  frames: UgoiraFrame[]
  @observable width: number
  @observable height: number
  status: Status = Status.RESOLVED

  constructor(attrs: IllustAttrs) {
    const { mime_type, frames } = JSON.parse(
      attrs.ugoiraMetaFullscreen!
    ) as UgoiraMeta

    this.id = attrs.illustId
    this.src = attrs.url.ugoira600x600.replace('600x600', '1920x1080')
    this.alt = attrs.illustTitle
    this.width = Number(attrs.illustWidth)
    this.height = Number(attrs.illustHeight)
    this.mime_type = mime_type
    this.frames = frames
  }

  @action
  setSize(size: HTMLCanvasElement) {
    this.width = size.width
    this.height = size.height
  }

  @action.bound
  handleChange(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting) {
    }
  }

  static fromAttrs(attrs: IllustAttrs) {
    return [new Ugoira(attrs)]
  }
}
