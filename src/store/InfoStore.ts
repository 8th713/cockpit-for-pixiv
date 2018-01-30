import { observable, computed, action, reaction } from 'mobx'
import { Repository } from './Repository'
import { StorageService } from '../types'

export class InfoStore {
  private storage: StorageService
  private repository: Repository

  @computed
  get status() {
    return this.repository.status
  }

  @computed
  get current() {
    return this.repository.current
  }

  @observable opened: boolean = false

  constructor(storage: StorageService, repository: Repository) {
    this.storage = storage
    this.repository = repository

    this.opened = storage.load('sidePanel', false)

    reaction(() => this.current, () => this.loadDetials())
  }

  @action
  toggle() {
    this.opened = !this.opened
    this.storage.store('sidePanel', this.opened)
    this.loadDetials()
  }

  private loadDetials() {
    if (this.opened && this.current) {
      this.current.loadIfNeeded()
    }
  }
}
