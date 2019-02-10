import React from 'react'
import ReactDOM from 'react-dom'
import { createLoggingService } from './externals/logging'
import { createGlobalData } from './externals/pixivGlobalData'
import { createAPIClient } from './externals/apiClient'
import { App } from './components/App'

const loggingService = createLoggingService()
const globalData = createGlobalData(loggingService)
const apiClient = createAPIClient(globalData, loggingService)

ReactDOM.render(
  <App loggingService={loggingService} apiCllient={apiClient} />,
  document.body.appendChild(document.createElement('div'))
)

// @ts-ignore
window.dumpError = loggingService.dump
