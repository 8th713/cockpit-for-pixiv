import React, { useContext } from 'react'
import { useIntersection } from './useIntersection'

type Observer = ReturnType<typeof useIntersection>
type Props = { children?: React.ReactNode }

const IObserver = React.createContext<Observer | null>(null)
IObserver.displayName = 'IObserver'

export const useIObserver = () => {
  const value = useContext(IObserver)
  if (value === null) {
    throw new Error('Missing IObserver')
  }
  return value
}
export const IOProvider = ({ children }: Props) => (
  <IObserver.Provider value={useIntersection()}>{children}</IObserver.Provider>
)
