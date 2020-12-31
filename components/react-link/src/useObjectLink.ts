import { useReducer } from 'react'

export interface ObjectLink<T> {
  update: (updatedValue: Partial<T>) => void
  set: (value: T) => void
  value: T
  cb: (updatedPropName: string) => (updatedValue: any) => void
}

interface Action {
  type: string
  value: any
}

const reducer = (state: any, action: Action) => {
  if (action.type === 'set') {
    return action.value
  }
  if (action && action.type) {
    return { ...state, [action.type]: action.value }
  }
  console.warn('Invalid action', { action })
  return state
}

const createReducerLinkInterface = <T extends {}>([
  state,
  dispatch,
]: any): ObjectLink<T> => {
  return {
    set: (value) => dispatch({ type: 'set', value }),
    update: (obj) => {
      Object.entries(obj).map(([type, value]) =>
        dispatch({
          type,
          value,
        }),
      )
    },
    cb: (type) => (value) =>
      dispatch({
        type,
        value,
      }),
    value: state,
  }
}

export const useObjectLink = <T extends Object>(defaultValue: T): ObjectLink<T> => {
  return createReducerLinkInterface(useReducer(reducer, defaultValue || {}))
}

export default useObjectLink
