import { AboutManager } from './features/About/AboutManager'
import { globalStyles } from './features/globalStyles'
import { Router } from './features/Router/Router'

export const App = () => {
  globalStyles()
  return (
    <>
      <Router />
      <AboutManager
        title={`${GM_info.script.name} - ${GM_info.script.version}`}
      />
    </>
  )
}
