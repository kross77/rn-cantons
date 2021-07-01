import uuidv4 from '../generators/uuidv4'

export default class Collection<T> {
  private storage: { [key: string]: T }

  constructor(storage: { [key: string]: T } = {}) {
    this.storage = storage
  }

  get object(): { [key: string]: T } {
    return this.storage
  }

  get array(): (T & { id: string })[] {
    return Object.entries(this.storage).map(([id, value]) => ({ id, ...value }))
  }

  generateKey(): string {
    const key = uuidv4()
    return this.storage[key] ? this.generateKey() : key
  }

  add(value: T): string {
    const key = this.generateKey()
    this.storage[key] = value
    return key
  }

  set(id: string, value: T): void {
    this.storage[id] = value
  }

  update(id: string, value: T): void {
    this.storage[id] = { ...this.storage[id], ...value }
  }

  get(id: string): T {
    return this.storage[id]
  }
}
