import ky from 'ky'
import { Pages, Ugoira } from '../core/interfaces'

const api = ky.create({
  credentials: 'same-origin',
  cache: 'no-cache'
})

export async function fetchUgoira(id: string) {
  const data = await api
    .get(`/ajax/illust/${id}/ugoira_meta`)
    .json<{ body: Ugoira }>()

  return data.body
}

export async function fetchPages(id: string) {
  const data = await api.get(`/ajax/illust/${id}/pages`).json<{ body: Pages }>()

  return data.body
}
