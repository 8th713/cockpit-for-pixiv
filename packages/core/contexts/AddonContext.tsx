import React from 'react'
import { AddonStore } from '../externals/addonStore'

export const AddonContext = React.createContext<AddonStore>({} as any)
