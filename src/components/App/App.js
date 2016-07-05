import React, { PropTypes } from 'react'
import less from './style.less'
import Dialog from '../Dialog'
import Canvas from '../Canvas'
import SidePanel from '../SidePanel'

const App = (props) => (
  <Dialog {...props}>
    <div className={less.app}>
      <Canvas {...props} />
      <SidePanel />
    </div>
  </Dialog>
)

App.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default App
