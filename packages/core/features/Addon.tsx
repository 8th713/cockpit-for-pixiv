import React, { useContext } from 'react'
import { AddonStore } from '../externals/addonStore'

type Props = {
  value: AddonStore
  children?: React.ReactNode
}

const Addon = React.createContext<AddonStore | null>(null)

export const useAddon = () => {
  const value = useContext(Addon)
  if (value === null) throw new Error('Missing AddonProvider')
  return value
}

export const AddonProvider = ({ children, value }: Props) => (
  <Addon.Provider value={value}>{children}</Addon.Provider>
)

if (__DEV__) {
  Addon.displayName = 'Addon'
}
