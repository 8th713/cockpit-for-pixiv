import { useReducer } from 'react'

const empty = {}
const reducer = () => ({})

export const useForceUpdate = () => useReducer(reducer, empty)[1] as () => void
