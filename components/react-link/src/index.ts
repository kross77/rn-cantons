import { useState } from 'react'
import { ObjectLink as OL } from './useObjectLink'

export { useObjectLink } from './useObjectLink'
export type Link<T extends any> = [T, (v: T) => void]

export type ObjectLink<T> = OL<T>

export class ObjectLinkState<T> implements ObjectLink<T> {
  state: T

  constructor(defaultValue: T) {
    this.state = defaultValue
  }

  update(updatedValue: Partial<T>): void {
    this.state = { ...this.state, ...updatedValue }
  }

  toString(): string {
    //
    return String(this.state)
  }

  set(value: T): void {
    this.state = value
  }

  get value(): T {
    return this.state
  }

  cb(updatedPropName: string): any {
    return (updatedValue: any) =>
      // @ts-ignore
      this.update({ [updatedPropName]: updatedValue })
  }
}

export const createArrayLinkInterface = <T extends any>([value, setValue]: Link<
  T[]
>): ArrayLink<T> => {
  const remove = (index: number) => {
    value.splice(index, 1)
    setValue([...value])
  }

  return {
    value,
    update: (index: number, updatedValue: T) => {
      value[index] = updatedValue
      setValue([...value])
    },
    add: (item: T) => {
      value.push(item)
      setValue([...value])
    },
    remove,
    pop: () => remove(value.length - 1),
    set: (newValue: T[]) => setValue(newValue),
    move: (oldIndex, newIndex) => {
      if (newIndex >= value.length) {
        let k = newIndex - value.length + 1
        while (k--) {
          // @ts-ignore
          value.push(undefined)
        }
      }
      value.splice(newIndex, 0, value.splice(oldIndex, 1)[0])
      setValue([...value])
    },
  }
}

export const updateOne = <T extends any>([value, setValue]: Link<T>) => ({
  value,
  update: setValue,
})

export const updateSingle = <T extends any>([value, setValue]: Link<T>) => ({
  value,
  set: setValue,
  cb: (value: T) => () => setValue(value),
})

export interface ArrayLink<T> {
  update: (index: number, updatedValue: T) => void
  set: (value: T[]) => void
  add: (item: T) => void
  move: (oldIndex: number, newIndex: number) => void
  remove: (index: number) => void
  pop: () => void
  value: T[]
}
export interface SingleLink<T> {
  set: (value: T) => void
  cb: (value: T) => () => void
  value: T
}

export const useArrayLink = <T>(initState: T[] | (() => T[])): ArrayLink<T> => {
  const value = useState<T[]>(initState)
  return {
    ...createArrayLinkInterface<T>(value),
  }
}

export const useSingleLink = <T>(initState: T | (() => T)): SingleLink<T> => {
  const value = useState(initState)
  // @ts-ignore
  return updateSingle(value)
}
