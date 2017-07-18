// @flow
import camelize from 'camelize'

type ReqestBodyObject = {
  [key: string]: string | number | string[]
}

export class Http {
  delay<T>(value: T): Promise<T> {
    return new Promise(resolve => {
      setTimeout(resolve, 200, value)
    })
  }

  getDoc(url: string): Promise<Document> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const catchError = () => {
        reject(new Error(`${xhr.status}: ${xhr.statusText}`))
      }

      xhr.open('GET', url, true)
      xhr.responseType = 'document'
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        }
        catchError()
      })
      xhr.addEventListener('error', catchError)
      xhr.addEventListener('timeout', catchError)
      xhr.send()
    })
  }

  getImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = document.createElement('img')

      image.addEventListener('load', () => {
        resolve(image)
      })
      image.addEventListener('error', () => {
        reject(new Error('Could not acquire image.'))
      })
      image.src = url
    })
  }

  async getJSON(url: string) {
    const response = await fetch(url, {credentials: 'same-origin'})

    if (response.ok) {
      const json = await response.json()

      return camelize(json)
    }
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  normalizeRequestBody(body: ReqestBodyObject) {
    return Object.keys(body).reduce((params, key) => {
      const value = body[key]
      let strVal

      switch (typeof value) {
        case 'string':
        case 'number':
          strVal = String(value)
          break
        default:
          strVal = value.join('+')
          break
      }

      params.append(key, strVal)
      return params
    }, new URLSearchParams())
  }

  getRequestOptions(body: ReqestBodyObject): RequestOptions {
    return {
      body: this.normalizeRequestBody(body),
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      method: 'POST',
    }
  }

  async postJSON(url: string, body: ReqestBodyObject) {
    const options = this.getRequestOptions(body)
    const response = await fetch(url, options)

    if (response.ok) {
      const json = await response.json()

      return camelize(json)
    }
    throw new Error(`${response.status}: ${response.statusText}`)
  }
}

export default new Http()
