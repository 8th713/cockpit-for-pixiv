import * as camelize from 'camelize'

export interface ReqestBodyObject {
  [key: string]: string | number | string[]
}

export class HttpCliant {
  async getDoc(url: string): Promise<Document> {
    const response = await fetch(url, { credentials: 'same-origin' })

    if (response.ok) {
      const text = await response.text()

      return new DOMParser().parseFromString(text, 'text/html')
    }
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  async getJSON<T>(url: string) {
    const response = await fetch(url, { credentials: 'same-origin' })

    if (response.ok) {
      const json = await response.json()

      return camelize(json) as T
    }
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  async postJSON<T>(url: string, body: ReqestBodyObject) {
    const response = await fetch(url, this.getRequestInit(body))

    if (response.ok) {
      const json = await response.json()

      return camelize(json) as T
    }
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  private normalizeRequestBody(body: ReqestBodyObject) {
    return Object.keys(body).reduce((params, key) => {
      const value = body[key]
      let strVal

      switch (typeof value) {
        case 'string':
        case 'number':
          strVal = String(value)
          break
        default:
          strVal = (value as string[]).join('+')
          break
      }

      params.append(key, strVal)
      return params
    }, new URLSearchParams())
  }

  private getRequestInit(body: ReqestBodyObject): RequestInit {
    return {
      body: this.normalizeRequestBody(body),
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST'
    }
  }
}
