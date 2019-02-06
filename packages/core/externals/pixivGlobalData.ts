import { PixivGlobalData } from '../interfaces'

declare var pixiv: {
  context: {
    token: string
  }
  user: {
    id: string
  }
}

declare var globalInitData: {
  token: string
  userData: {
    id: string
  }
}

const pixivGlobalData: PixivGlobalData = {
  token: '',
  userId: ''
}

if (typeof pixiv !== 'undefined') {
  pixivGlobalData.token = pixiv.context.token
  pixivGlobalData.userId = pixiv.user.id
} else if (typeof globalInitData !== 'undefined') {
  pixivGlobalData.token = globalInitData.token
  pixivGlobalData.userId = globalInitData.userData.id
}

console.log(pixivGlobalData)
export { pixivGlobalData }
