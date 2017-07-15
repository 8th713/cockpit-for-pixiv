// @flow
import './styles/Help.css'
import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import Dialog from '../shared/Dialog'
import Links from './Links'
import KeyMap from './KeyMap'
import type {Help} from '../../store/help'
import type {Command} from '../../store/command'
import type {UseCase} from '../../useCase'

type Props = {
  +help: Help,
  +command: Command,
  +useCase: UseCase,
}

@observer
export default class HelpView extends PureComponent<void, Props, void> {
  handleClose = () => {
    this.props.useCase.help.close()
  };

  render() {
    const {help, command} = this.props

    return (
      <Dialog open={help.opened} onClose={this.handleClose}>
        <div className="Help">
          <h1 className="Help-title">{help.title}</h1>
          <Links help={help} />
          <h2 className="Help-subhead">Key Commands</h2>
          <div className="Help-table">
            <KeyMap items={command.items} />
          </div>
        </div>
      </Dialog>
    )
  }
}
