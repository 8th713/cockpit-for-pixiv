import React from 'react'
import PropTypes from 'prop-types';
import less from './style.less'
import Dialog from '../Dialog'
import Canvas from '../Canvas'
import SidePanel from '../SidePanel'
import Snackbar from '../Snackbar'

const App = (props) => (
  <Dialog {...props}>
    <div className={less.app}>
      <Canvas {...props} />
      <SidePanel />
    </div>
    <Snackbar />
  </Dialog>
)

App.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default App
