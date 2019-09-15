import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Box, Divider } from '../components'
import { AddonStore } from '../externals/addonStore'
import { About } from '../features/About'
import { AddonProvider } from '../features/Addon'
import { Caption } from '../features/Caption'
import { Description } from '../features/Description'
import { FullSizeMode, FullSizeView } from '../features/FullSizeView'
import { RelatedWorks } from '../features/RelatedWorks'
import { Router } from '../features/Router'
import { ScrollSpy } from '../features/ScrollSpy'
import { StandardView } from '../features/StandardView'
import { User } from '../features/User'
import { GlobalStyle } from './GlobalStyle'
import { theme } from './theme'

type Props = { addonStore: AddonStore }

export const App = ({ addonStore }: Props) => (
  <ThemeProvider theme={theme}>
    <AddonProvider value={addonStore}>
      <GlobalStyle />
      <About>
        <Router>
          {illustId => (
            <FullSizeMode>
              <ScrollSpy illustId={illustId}>
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
                <FullSizeView illustId={illustId} />
              </ScrollSpy>
            </FullSizeMode>
          )}
        </Router>
      </About>
    </AddonProvider>
  </ThemeProvider>
)
