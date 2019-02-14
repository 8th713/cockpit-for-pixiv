import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import { ServiceProvider } from './components/ServiceProvider'
import { createAddonStore } from './externals/addonStore'
import { createAPIClient } from './externals/apiClient'
import { createLoggingService } from './externals/logging'
import { createGlobalData } from './externals/pixivGlobalData'

const loggingService = createLoggingService()
const globalData = createGlobalData(loggingService)
const apiClient = createAPIClient(globalData, loggingService)
const addonStore = createAddonStore()

ReactDOM.render(
  <ServiceProvider
    loggingService={loggingService}
    apiCllient={apiClient}
    addonStore={addonStore}
  >
    <App />
  </ServiceProvider>,
  document.body.appendChild(document.createElement('div'))
)

// @ts-ignore
window.dumpError = loggingService.dump
