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

const services = {
  page: new DOMPageService(),
  storage: new LocalStorageService('cockpit'),
  client: new PixivClientService(pixiv),
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
