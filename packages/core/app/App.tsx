import React from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { Box, Divider, Flex } from '../components'
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
                        <Box
                          sx={{
                            pointerEvents: 'auto',
                            position: 'sticky',
                            top: 0,
                            bottom: 0,
                            zIndex: 1,
                            flexShrink: 0,
                            bg: 'surface'
                          }}
                        >
                          <Caption />
                          <Divider
                            sx={{
                              mx: 3,
                              mt: '-1px',
                              transform: 'translateY(1px)'
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            pointerEvents: 'auto',
                            bg: 'surface',
                            color: 'onSurface'
                          }}
                        >
                          <Flex>
                            <Box
                              sx={{
                                flexGrow: 0,
                                flexShrink: 1,
                                flexBasis: '60em',
                                m: 3
                              }}
                            >
                              <Description />
                            </Box>
                            <Divider sx={{ ml: 'auto', my: 3 }} />
                            <Box
                              sx={{
                                flexGrow: 0,
                                flexShrink: 0,
                                flexBasis: 256,
                                mx: 3
                              }}
                            >
                              <Box
                                sx={{
                                  position: 'sticky',
                                  top: 'var(--caption-height)',
                                  py: 3
                                }}
                              >
                                <User />
                              </Box>
                            </Box>
                          </Flex>
                          <Box>
                            <RelatedWorks />
                          </Box>
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
