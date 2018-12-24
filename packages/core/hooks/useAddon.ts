import { createContext, useContext } from 'react'
import { createAddonStore } from '../externals/addonStore'

const Context = createContext(createAddonStore())

/**
 * Returns Addon store
 */
export function useAddon() {
  const store = useContext(Context)

  return store
}

useAddon.Context = Context
