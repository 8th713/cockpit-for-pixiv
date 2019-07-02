import React, { useContext } from 'react'
import { useServices } from '../../Services'
import { User } from '../../../interfaces'

type Props = {
  id: string
  children?: React.ReactNode
}

const NO_PROVIDER = 'Missing UserHost'
const CacheContext = React.createContext<
  | {
      input: string
      read: () => User | null
      remove: () => void
      replace: (value: User | null) => void
      reload: (alt?: User | null) => void
    }
  | typeof NO_PROVIDER
>(NO_PROVIDER)

export function useUser() {
  const value = useContext(CacheContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function UserHost({ id, children }: Props) {
  const { apiClient } = useServices()
  return (
    <CacheContext.Provider value={apiClient.useUser(id)}>
      {children}
    </CacheContext.Provider>
  )
}
