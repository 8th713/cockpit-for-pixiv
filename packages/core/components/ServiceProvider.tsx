import React from 'react'
import {
  AboutProvider,
  AddonContext,
  BoardProvider,
  ClientContext,
  FitProvider,
  IllustProvider,
  InfoProvider,
  LoggingContext,
  PaddingProvider,
  PickerProvider,
  SpreadProvider,
  TagSortProvider
} from '../contexts'
import { AddonStore } from '../externals/addonStore'
import { APIClient } from '../externals/apiClient'
import { LoggingService } from '../externals/logging'

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
                <SpreadProvider>
                  <InfoProvider>
                    <TagSortProvider>
                      <PickerProvider>
                        <IllustProvider>
                          <BoardProvider>{props.children}</BoardProvider>
                        </IllustProvider>
                      </PickerProvider>
                    </TagSortProvider>
                  </InfoProvider>
                </SpreadProvider>
              </FitProvider>
            </PaddingProvider>
          </AboutProvider>
        </ClientContext.Provider>
      </AddonContext.Provider>
    </LoggingContext.Provider>
  )
}
