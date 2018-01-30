import { StorageService } from '../types'

export class LocalStorageService implements StorageService {
  private prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }

  load<T>(key: string, defaultValue: T): T {
    const value = localStorage.getItem(`${this.prefix}/${key}`)

    if (value) {
      try {
        return JSON.parse(value)
      } catch (err) {}
    }
    return defaultValue
  }

  store<T>(key: string, value: T): void {
    const valueString = JSON.stringify(value)

    localStorage.setItem(`${this.prefix}/${key}`, valueString)
  }
}
