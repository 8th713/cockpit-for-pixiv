import React from 'react'
import ReactDOM from 'react-dom'
import { createLoggingService } from './externals/logging'
import { createGlobalData } from './externals/pixivGlobalData'
import { createAPIClient } from './externals/apiClient'
import { createAddonStore } from './externals/addonStore'
import { App } from './components/App'

const loggingService = createLoggingService()
const globalData = createGlobalData(loggingService)
const apiClient = createAPIClient(globalData, loggingService)
const addonStore = createAddonStore()

ReactDOM.render(
  <App
    loggingService={loggingService}
    apiCllient={apiClient}
    addonStore={addonStore}
  />,
  document.body.appendChild(document.createElement('div'))
)

// @ts-ignore
window.dumpError = loggingService.dump
