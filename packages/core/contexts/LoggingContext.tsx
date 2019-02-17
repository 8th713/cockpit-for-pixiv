import React from 'react'
import { LoggingService } from '../externals/logging'

export const LoggingContext = React.createContext<LoggingService>({} as any)
