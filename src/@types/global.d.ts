interface DOMRectReadOnly {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number
}

interface DOMRect extends DOMRectReadOnly {
  height: number
  width: number
  x: number
  y: number
}

interface ClientRect extends DOMRect {}

interface ResizeObserverCallback {
  (entries: ResizeObserverEntry[], observer: ResizeObserver): void
}

interface ResizeObserverEntry {
  readonly target: Element
  readonly contentRect: DOMRectReadOnly
}

interface ResizeObserver {
  observe(target: Element): void
  unobserve(target: Element): void
  disconnect(): void
}

declare var ResizeObserver: {
  prototype: ResizeObserver
  new (callback: ResizeObserverCallback): ResizeObserver
}

declare var pixiv: {
  context: {
    token: string
  }
  user: {
    id: string
    loggedIn: boolean
  }
}

interface UgoiraMeta {
  mime_type: string
  frames: Array<{ file: string; delay: number }>
}

interface ZIOptions {
  metadata: UgoiraMeta
  source: string
  canvas: HTMLCanvasElement
  chunkSize: number
  autoStart?: boolean
  autosize?: boolean
  loop?: boolean
  debug?: boolean
}

declare class ZipImagePlayer {
  constructor(options: ZIOptions)
  stop(): void
}

interface DownloadAddonPayload {
  title: string
  author: string
  type: 'image' | 'comic' | 'ugoira'
  images: Array<{ src: string; alt: string }>
}
