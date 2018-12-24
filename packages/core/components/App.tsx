import React from 'react'
import { GlobalStyle } from './GlobalStyle'
import { Article } from './Article'
import { About } from './About'
import { PaddingProvider, AboutProvider, PickerProvider } from '../contexts'

export const App = React.memo(function App() {
  return (
    <>
      <GlobalStyle />
      <PaddingProvider>
        <AboutProvider>
          <PickerProvider>
            <Article />
          </PickerProvider>
          <About />
        </AboutProvider>
      </PaddingProvider>
    </>
  )
})
