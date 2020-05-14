import ky from 'ky'

export const fetchUgoira = async (id: string) => {
  const { body, error, message } = await ky
    .get(`/ajax/illust/${id}/ugoira_meta`, {
      credentials: 'same-origin',
      cache: 'no-cache'
    })
    .json<Pixiv.ResponseData<Pixiv.Ugoira>>()

  if (error) throw new Error(message)
  return body
}

export const fetchPages = async (id: string) => {
  const { body, error, message } = await ky
    .get(`/ajax/illust/${id}/pages`, {
      credentials: 'same-origin',
      cache: 'no-cache'
    })
    .json<Pixiv.ResponseData<Pixiv.Pages>>()

  if (error) throw new Error(message)
  return body
}
