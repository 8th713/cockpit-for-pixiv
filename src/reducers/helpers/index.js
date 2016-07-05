import { createAction } from 'redux-act'

export const presist = (key, reducer, initial) => {
  const initialState =
    localStorage.hasOwnProperty(key) ?
    JSON.parse(localStorage.getItem(key)) : initial

  return (state = initialState, action) => {
    const nextState = reducer(state, action)
    if (state !== nextState) {
      requestAnimationFrame(() =>
        localStorage.setItem(key, JSON.stringify(nextState))
      )
      return nextState
    }
    return state
  }
}

export const createCreator = (key) =>
  (type, ...args) => createAction(`${key}/${type}`, ...args)
