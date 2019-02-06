import { useStrict } from 'mobx'
import { AddonService } from './service/AddonService'
import { DOMPageService } from './service/DOMPageService'
import { LocalStorageService } from './service/LocalStorageService'
import { PixivClientService } from './service/PixivClientService'
import { TwitterService } from './service/TwitterService'
import { KeyboardShortcutService } from './service/KeyboardShortcutService'
import { AppStore } from './store/AppStore'
import { render } from './ui'

useStrict(true)

const pixivGlobalData: PixivGlobalData = {
  token: '',
  userId: '',
  loggedIn: false
}

if (typeof pixiv !== 'undefined') {
  pixivGlobalData.token = pixiv.context.token
  pixivGlobalData.userId = pixiv.user.id
  pixivGlobalData.loggedIn = pixiv.user.loggedIn
} else if (typeof globalInitData !== 'undefined') {
  pixivGlobalData.token = globalInitData.token
  pixivGlobalData.userId = globalInitData.userData.id
  pixivGlobalData.loggedIn = true
}

const services = {
  page: new DOMPageService(),
  storage: new LocalStorageService('cockpit'),
  client: new PixivClientService(pixivGlobalData),
  share: new TwitterService(),
  shortcut: new KeyboardShortcutService(),
  addon: new AddonService()
}

const appStore = new AppStore(services)

services.page.injectGlobal()
services.page.onSelect(element => {
  appStore.setElement(element)
})

render(appStore)
