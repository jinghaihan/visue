import { isObject } from 'lodash-es'

class WebStorage {
  public $ss: SessionStorage
  public $ls: LocalStorage

  constructor() {
    this.$ss = new SessionStorage()
    this.$ls = new LocalStorage()
  }
}

class LocalStorage {
  set(key: string, value: string | object) {
    localStorage.setItem(key, isObject(value) ? JSON.stringify(value) : value)
  }

  get(key: string) {
    return localStorage.getItem(key)
  }
}

class SessionStorage {
  set(key: string, value: string | object) {
    sessionStorage.setItem(key, isObject(value) ? JSON.stringify(value) : value)
  }

  get(key: string) {
    return sessionStorage.getItem(key)
  }
}

export const webStorage = new WebStorage()
