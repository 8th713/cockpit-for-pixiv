import { LoggingService } from './logging'
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

export function createGlobalData(
  loggingService: LoggingService
): PixivGlobalData {
  let token: string = ''
  let userId: string = ''

  if (typeof pixiv !== 'undefined') {
    token = pixiv.context.token
    userId = pixiv.user.id
  } else if (typeof globalInitData !== 'undefined') {
    token = globalInitData.token
    userId = globalInitData.userData.id
  }
  if (!token || !userId) {
    loggingService.log(
      new Error('Unauthorized: can not get a token or user id')
    )
  }
  console.log({ token, userId })
  return { token, userId }
}
