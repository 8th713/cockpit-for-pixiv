import { createAction } from 'redux-actions'

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

export const createCreator = (prefix) => (key, ...fns) => {
  const type = `${prefix}/${key}`
  const ac = createAction(type, ...fns)
  ac.bindTo = (dispatch, ...rest) => (...args) => dispatch(ac(...rest, ...args))
  ac.getType = () => type
  return ac
}
