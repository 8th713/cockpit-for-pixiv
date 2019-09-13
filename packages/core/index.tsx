import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/App'
import { createAddonStore } from './externals/addonStore'

const addonStore = createAddonStore()

ReactDOM.render(
  <App addonStore={addonStore} />,
  document.body.appendChild(document.createElement('div'))
)
