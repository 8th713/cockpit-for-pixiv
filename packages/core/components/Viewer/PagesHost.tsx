import React, { useContext } from 'react'
import { Pages } from '../../interfaces'
import { useServices } from '../Services'

type Props = {
  id: string
  children?: React.ReactNode
}

const NO_PROVIDER = 'Missing PagesHost'
const CacheContext = React.createContext<
  | {
      input: string
      read: () => Pages | null
      remove: () => void
      replace: (value: Pages | null) => void
      reload: (alt?: Pages | null) => void
    }
  | typeof NO_PROVIDER
>(NO_PROVIDER)

export function usePages() {
  const value = useContext(CacheContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function PagesHost({ id, children }: Props) {
  const { apiClient } = useServices()
  return (
    <CacheContext.Provider value={apiClient.usePages(id)}>
      {children}
    </CacheContext.Provider>
  )
}
