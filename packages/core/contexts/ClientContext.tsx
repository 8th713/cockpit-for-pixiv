import React from 'react'
import { APIClient } from '../externals/apiClient'

export const ClientContext = React.createContext<APIClient>({} as any)
