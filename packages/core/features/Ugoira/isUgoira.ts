export const isUgoira = (page: Pixiv.Page) =>
  page ? page.urls.original.includes('ugoira0') : false
