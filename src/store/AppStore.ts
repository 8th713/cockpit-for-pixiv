import { Services } from '../types'
import { Repository } from './Repository'
import { ViewStore } from './ViewStore'
import { InfoStore } from './InfoStore'
import { BookmarkStore } from './BookmarkStore'
import { HelpStore } from './HelpStore'

export class AppStore {
  private repository: Repository
  view: ViewStore
  info: InfoStore
  bookmark: BookmarkStore
  help: HelpStore

  constructor(services: Services) {
    const repository = new Repository(services)

    this.repository = repository
    this.view = new ViewStore(services, repository)
    this.info = new InfoStore(services.storage, repository)
    this.bookmark = new BookmarkStore(services, repository)
    this.help = new HelpStore(services.shortcut)
    services.shortcut.register({
      key: 'j',
      description: '次の作品へ',
      priority: 100,
      handler: () => {
        repository.cycle(false)
      }
    })
    services.shortcut.register({
      key: 'k',
      description: '前の作品へ',
      priority: 100,
      handler: () => {
        repository.cycle(true)
      }
    })
    services.shortcut.register({
      key: 'v',
      description: 'スケーリング方式を変更',
      priority: 100,
      handler: () => {
        this.view.cycleFit()
      }
    })
    services.shortcut.register({
      key: 'h',
      description: '見開き方式を変更',
      priority: 100,
      handler: () => {
        this.view.cycleSpread()
      }
    })
    services.shortcut.register({
      key: 'i',
      description: '情報欄のトグル',
      priority: 100,
      handler: () => {
        this.info.toggle()
      }
    })
    services.shortcut.register({
      key: 'b',
      description: 'ブックマークフォームを表示',
      handler: () => {
        this.bookmark.open()
      }
    })
    services.shortcut.register({
      key: 'q',
      description: 'クイックブックマーク',
      handler: () => {
        if (repository.isControllable) {
          const { bookmark } = repository.current!

          if (bookmark.isBookmarked === false) {
            bookmark.bookmarkIfNeeded({
              restrict: 0,
              comment: '',
              tags: ''
            })
          }
        }
      }
    })
    services.shortcut.register({
      key: 'l',
      description: 'いいね！',
      handler: () => {
        if (repository.isControllable) {
          repository.current!.likeItIfNeeded()
        }
      }
    })
    services.shortcut.register({
      key: 's',
      description: 'Twitterでシェア',
      handler: () => {
        if (repository.isControllable) {
          repository.current!.share()
        }
      }
    })
    services.shortcut.register({
      key: 'd',
      description: 'ダウンロード',
      handler: () => {
        if (repository.isControllable) {
          repository.current!.download()
        }
      }
    })
    services.shortcut.register({
      key: '?',
      description: 'ヘルプのトグル',
      handler: () => {
        this.help.toggle()
      }
    })
  }

  setElement(element: HTMLAnchorElement) {
    this.repository.resolve(element)
  }
}
