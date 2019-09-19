import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/App'
import { createAddonStore } from './externals/addonStore'
import extraScopePlugin from 'stylis-plugin-extra-scope'

const scope = '#cockpit-for-pixiv'
const stylisPlugins = [extraScopePlugin(scope)]
const addonStore = createAddonStore()
const root = document.createElement('div')
root.id = scope.slice(1)

ReactDOM.render(
  <App addonStore={addonStore} stylisPlugins={stylisPlugins} />,
  document.body.appendChild(root)
)
