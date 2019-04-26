import React from 'react'
import { AddonContext, ClientContext, LoggingContext } from '../contexts'
import { AddonStore } from '../externals/addonStore'
import { APIClient } from '../externals/apiClient'
import { LoggingService } from '../externals/logging'
import {
  useAboutContext,
  useBoardContext,
  useExpansionContext,
  useFitContext,
  useIllustContext,
  usePaddingContext,
  usePickerContext,
  useSortContext,
  useSpreadContext
} from '../hooks'

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
          <useAboutContext.Provider>
            <usePaddingContext.Provider>
              <useFitContext.Provider>
                <useSpreadContext.Provider>
                  <useExpansionContext.Provider>
                    <useSortContext.Provider>
                      <usePickerContext.Provider>
                        <useIllustContext.Provider>
                          <useBoardContext.Provider>
                            {props.children}
                          </useBoardContext.Provider>
                        </useIllustContext.Provider>
                      </usePickerContext.Provider>
                    </useSortContext.Provider>
                  </useExpansionContext.Provider>
                </useSpreadContext.Provider>
              </useFitContext.Provider>
            </usePaddingContext.Provider>
          </useAboutContext.Provider>
        </ClientContext.Provider>
      </AddonContext.Provider>
    </LoggingContext.Provider>
  )
}
