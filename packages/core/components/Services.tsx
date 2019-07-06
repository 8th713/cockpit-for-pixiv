import React, { useContext, useDebugValue } from 'react'
import { AddonStore } from '../externals/addonStore'
import { APIClient } from '../externals/apiClient'

export type ServicesProps = {
  addonStore: AddonStore
} & APIClient

type Props = ServicesProps & {
  children?: React.ReactNode
}

const NO_PROVIDER = 'Missing Services'
const ValueContext = React.createContext<ServicesProps | typeof NO_PROVIDER>(
  NO_PROVIDER
)

export function useServices() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  useDebugValue(value)
  return value
}

export function Services({ children, ...props }: Props) {
  return <ValueContext.Provider value={props}>{children}</ValueContext.Provider>
}
