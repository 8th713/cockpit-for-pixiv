import ky from 'ky'

const api = ky.create({
  credentials: 'same-origin',
  cache: 'no-cache'
})

export async function fetchUgoira(id: string) {
  const data = await api
    .get(`/ajax/illust/${id}/ugoira_meta`)
    .json<{ body: Pixiv.Ugoira }>()

  return data.body
}

export async function fetchPages(id: string) {
  const data = await api
    .get(`/ajax/illust/${id}/pages`)
    .json<{ body: Pixiv.Pages }>()

  return data.body
}
