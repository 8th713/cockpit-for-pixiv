import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'

// ReactDOM.render(
//   <App />,
//   document.body.appendChild(document.createElement('div'))
// )

ReactDOM.createRoot(
  document.body.appendChild(document.createElement('div'))
).render(<App />)
