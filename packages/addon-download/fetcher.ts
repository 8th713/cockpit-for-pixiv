import wretch from 'wretch'
import { Ugoira, Pages } from '../core/interfaces'

export function fetchUgoira(id: string) {
  return wretch(`/ajax/illust/${id}/ugoira_meta`)
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')
    .resolve(resolver => resolver.json(data => data.body))
    .get() as Promise<Ugoira>
}

export function fetchPages(id: string) {
  return wretch(`/ajax/illust/${id}/pages`)
    .options({ credentials: 'same-origin', cache: 'no-cache' })
    .content('application/json')
    .errorType('json')
    .resolve(resolver => resolver.json(data => data.body))
    .get() as Promise<Pages>
}
