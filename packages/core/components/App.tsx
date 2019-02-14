import React from 'react'
import { About } from './About'
import { Article } from './Article'
import { GlobalStyle } from './GlobalStyle'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Article />
      <About />
    </>
  )
}
