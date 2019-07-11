import React from 'react'
import { ThemeProvider } from 'styled-components'
import { About, AboutHost } from './About'
import { GlobalStyle } from './GlobalStyle'
import { Info } from './Info'
import { Router } from './Router'
import { Services, ServicesProps } from './Services'
import { theme } from './theme'
import { Viewer } from './Viewer'

type Props = {
  services: ServicesProps
}

export function App({ services }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Services {...services}>
        <GlobalStyle />
        <AboutHost>
          <Router>
            {id => (
              <Viewer id={id}>
                <Info />
              </Viewer>
            )}
          </Router>
          <About />
        </AboutHost>
      </Services>
    </ThemeProvider>
  )
}
