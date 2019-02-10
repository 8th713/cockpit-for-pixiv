import React from 'react'
import { GlobalStyle } from './GlobalStyle'
import { Article } from './Article'
import { About } from './About'
import {
  PaddingProvider,
  AboutProvider,
  PickerProvider,
  ClientContext,
  LoggingContext
} from '../contexts'
import { LoggingService } from '../externals/logging'
import { APIClient } from '../externals/apiClient'

type Props = {
  loggingService: LoggingService
  apiCllient: APIClient
}

export function App(props: Props) {
  return (
    <>
      <GlobalStyle />
      <LoggingContext.Provider value={props.loggingService}>
        <ClientContext.Provider value={props.apiCllient}>
          <PaddingProvider>
            <AboutProvider>
              <PickerProvider>
                <Article />
              </PickerProvider>
              <About />
            </AboutProvider>
          </PaddingProvider>
        </ClientContext.Provider>
      </LoggingContext.Provider>
    </>
  )
}
