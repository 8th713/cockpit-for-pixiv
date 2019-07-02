import { Page } from '../../interfaces'

export const isUgoira = (page: Page) =>
  page ? page.urls.original.includes('ugoira0') : false
