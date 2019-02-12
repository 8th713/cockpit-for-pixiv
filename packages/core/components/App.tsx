import React from 'react'
import { GlobalStyle } from './GlobalStyle'
import { Article } from './Article'
import { About } from './About'
import {
  LoggingContext,
  AddonContext,
  ClientContext,
  PaddingProvider,
  AboutProvider
} from '../contexts'
import { LoggingService } from '../externals/logging'
import { APIClient } from '../externals/apiClient'
import { AddonStore } from '../externals/addonStore'

type Props = {
  loggingService: LoggingService
  apiCllient: APIClient
  addonStore: AddonStore
}

export function App(props: Props) {
  return (
    <>
      <GlobalStyle />
      <LoggingContext.Provider value={props.loggingService}>
        <AddonContext.Provider value={props.addonStore}>
          <ClientContext.Provider value={props.apiCllient}>
            <PaddingProvider>
              <AboutProvider>
                <Article />
                <About />
              </AboutProvider>
            </PaddingProvider>
          </ClientContext.Provider>
        </AddonContext.Provider>
      </LoggingContext.Provider>
    </>
  )
}
