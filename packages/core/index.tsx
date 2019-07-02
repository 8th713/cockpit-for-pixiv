import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import { createAddonStore } from './externals/addonStore'
import { createAPIClient } from './externals/apiClient'
import { createGlobalData } from './externals/globalData'

const globalData = createGlobalData()
const apiClient = createAPIClient(globalData)
const addonStore = createAddonStore()
const services = { apiClient, addonStore }

ReactDOM.render(
  <App services={services} />,
  document.body.appendChild(document.createElement('div'))
)
