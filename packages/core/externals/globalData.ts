import { LABEL } from '../constants'
import { GlobalData } from '../interfaces'

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

export function createGlobalData(): GlobalData {
  let token: string = ''
  let userId: string = ''

  if (typeof pixiv !== 'undefined') {
    token = pixiv.context.token
    userId = pixiv.user.id
  } else if (typeof globalInitData !== 'undefined') {
    token = globalInitData.token
    userId = globalInitData.userData.id
  }
  if (!token || !userId)
    console.error(`${LABEL} Unauthorized: can not get a token or user id`)
  else console.log(LABEL, { token, userId })

  return { token, userId }
}
