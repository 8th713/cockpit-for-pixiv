import React from 'react'
import { Provider } from 'react-redux'
import App from './components/App'
import Bookmark from './components/Bookmark'
import Help from './components/Help'
import configureStore from './store/configureStore'
import render from './utils/render'

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
document.head.appendChild(link)

const store = configureStore()

window.dispatchEvent(new Event('resize'))

render(<Provider store={store}>
  <div>
    <App />
    <Bookmark />
    <Help />
  </div>
</Provider>)
