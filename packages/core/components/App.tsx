import React from 'react'
import { About, AboutHost } from './About'
import { GlobalStyle } from './GlobalStyle'
import { Router } from './Router'
import { Services, ServicesProps } from './Services'
import { Viewer } from './Viewer'

type Props = {
  services: ServicesProps
}

export function App({ services }: Props) {
  return (
    <Services {...services}>
      <GlobalStyle />
      <AboutHost>
        <Router>{id => <Viewer id={id} />}</Router>
        <About />
      </AboutHost>
    </Services>
  )
}
