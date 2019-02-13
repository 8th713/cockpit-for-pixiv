import React from 'react'
import { LoggingContext, AddonContext, ClientContext } from '../contexts'
import {
  AboutProvider,
  PaddingProvider,
  FitProvider,
  SpreadProvider
} from '../contexts'
import { LoggingService } from '../externals/logging'
import { APIClient } from '../externals/apiClient'
import { AddonStore } from '../externals/addonStore'

type Props = {
  loggingService: LoggingService
  apiCllient: APIClient
  addonStore: AddonStore
  children?: React.ReactNode
}

export function ServiceProvider(props: Props) {
  return (
    <LoggingContext.Provider value={props.loggingService}>
      <AddonContext.Provider value={props.addonStore}>
        <ClientContext.Provider value={props.apiCllient}>
          <AboutProvider>
            <PaddingProvider>
              <FitProvider>
                <SpreadProvider>{props.children}</SpreadProvider>
              </FitProvider>
            </PaddingProvider>
          </AboutProvider>
        </ClientContext.Provider>
      </AddonContext.Provider>
    </LoggingContext.Provider>
  )
}
