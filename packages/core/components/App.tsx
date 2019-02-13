import React from 'react'
import { GlobalStyle } from './GlobalStyle'
import { Article } from './Article'
import { About } from './About'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Article />
      <About />
    </>
  )
}
