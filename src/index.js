// @flow
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const {head, body} = document
if (head && body) {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
  head.appendChild(link)
  ReactDOM.render(
    <App />,
    body.appendChild(document.createElement('div')),
  )
}
