import {
  BookmarkAttrs,
  DetailsAttrs,
  IllustAttrs,
  TagAttrsDictionary
} from './store'

export const enum Status {
  IDLING,
  FETCHING,
  RESOLVED,
  REJECTED
}

export interface ClientService {
  getIllust(id: string): Promise<IllustAttrs>
  getIllustPage(id: string): Promise<DetailsAttrs>
  getImage(url: string): Promise<HTMLImageElement>
  getBookmarkPage(id: string): Promise<BookmarkAttrs>
  getUserTag(): Promise<TagAttrsDictionary>
  likeIt(id: string): Promise<void>
  bookmark(id: string, data: BookmarkAttrs): Promise<void>
}

export interface PageService {
  findThumbnail(element: HTMLAnchorElement, step: 1 | -1): HTMLAnchorElement
  getId(element: HTMLAnchorElement): string
  buildResizeObserver(listener: (rect: ClientRect) => void): ResizeObserver
  injectGlobal(): void
  toggleScrollbar(force: boolean): void
  scrollWindow(target: HTMLAnchorElement): void
  onMouseover(): void
  onSelect(listener: (target: HTMLAnchorElement) => void): void
}

export interface StorageService {
  load<T>(key: string, defaultValue: T): T
  store<T>(key: string, value: T): void
}

export interface ShareService {
  open(text: string, link: string): void
}

export interface AddonService {
  getPort(key: string): MessagePort | undefined
}

export interface KeyBinding {
  key: string
  description: string
  handler: (event: KeyboardEvent) => void
  priority?: number
}

export type KeyMap = { [key: string]: KeyBinding }

export interface ShortcutService {
  register(binding: KeyBinding): void
  getList(): KeyBinding[]
}

export interface Services {
  client: ClientService
  page: PageService
  storage: StorageService
  share: ShareService
  addon: AddonService
  shortcut: ShortcutService
}
