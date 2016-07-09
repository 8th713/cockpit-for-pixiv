import React, { PropTypes } from 'react'
import less from './style.less'
import Dialog from '../Dialog'
import Icon from '../Icon'
import keyActions from '../../keyActions'

const Key = (key) => (<kbd key={key}>{key}</kbd>)
const Row = (row, index) => (
  <tr key={index}>
    <td>{row.description}</td>
    <td>{row.keys.map(Key)}</td>
  </tr>
)

/* global GM_info */
// eslint-disable-next-line camelcase
const { script } = GM_info
const Help = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <div className={less.help}>
      <h1 className={less.title}>{script.name} - {script.version}</h1>
      <div className={less.list}>
        <a className={less.item} href={script.homepage}>
          <Icon>code</Icon>
          <span className={less.text}>View the Github Project</span>
        </a>
        <a className={less.item} href={script.supportURL}>
          <Icon>bug_report</Icon>
          <span className={less.text}>Report Issues</span>
        </a>
      </div>
      <h2 className={less.sub}>Key Commands</h2>
      <div className={less.table}>
        <table>
          <tbody>{keyActions.map(Row)}</tbody>
        </table>
      </div>
    </div>
  </Dialog>
)

Help.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Help
