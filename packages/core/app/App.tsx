import React from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { Box, Divider } from '../components'
import { AddonStore } from '../externals/addonStore'
import { About } from '../features/About'
import { AddonProvider } from '../features/Addon'
import { Caption } from '../features/Caption'
import { Description } from '../features/Description'
import { FullSizeMode, FullSizeView } from '../features/FullSizeView'
import { IOProvider } from '../features/IntersectionObserver'
import { RelatedWorks } from '../features/RelatedWorks'
import { Router } from '../features/Router'
import { ScrollSpy } from '../features/ScrollSpy'
import { StandardView } from '../features/StandardView'
import { User } from '../features/User'
import { GlobalStyle } from './GlobalStyle'
import { theme } from './theme'

type Props = { stylisPlugins?: Function[]; addonStore: AddonStore }

const SheetManager = (StyleSheetManager as unknown) as React.FC<{
  children?: React.ReactChild
  disableCSSOMInjection?: boolean
  disableVendorPrefixes?: boolean
  sheet?: any
  stylisPlugins?: Function[]
  target?: HTMLElement
}>

export const App = ({ addonStore, stylisPlugins }: Props) => (
  <>
    <GlobalStyle />
    <SheetManager disableVendorPrefixes stylisPlugins={stylisPlugins}>
      <ThemeProvider theme={theme}>
        <AddonProvider value={addonStore}>
          <About>
            <Router>
              {illustId => (
                <FullSizeMode>
                  <ScrollSpy illustId={illustId}>
                    <IOProvider>
                      <StandardView illustId={illustId}>
                        <Caption />
                        <Box display="flex" flexDirection="column" bg="surface">
                          <Divider mx={3} />
                        </Box>
                        <Box
                          display="flex"
                          p={3}
                          alignItems="flex-start"
                          bg="surface"
                        >
                          <Box flex="960px" maxWidth={960}>
                            <Description />
                          </Box>
                          <Box pr={3} flexGrow={1} />
                          <Box
                            position="sticky"
                            top="var(--caption-height)"
                            flex="0 0 280px"
                          >
                            <User />
                          </Box>
                        </Box>
                        <Box bg="surface">
                          <RelatedWorks />
                        </Box>
                      </StandardView>
                    </IOProvider>
                    <FullSizeView illustId={illustId} />
                  </ScrollSpy>
                </FullSizeMode>
              )}
            </Router>
          </About>
        </AddonProvider>
      </ThemeProvider>
    </SheetManager>
  </>
)
