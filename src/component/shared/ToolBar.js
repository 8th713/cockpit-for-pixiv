// @flow
import './styles/ToolBar.css'
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import IconButton from './IconButton'
import type Action from '../../action/interface'
import type {Command} from '../../store/command'

type Props = {
  command: Command,
}

@observer
export default class ToolBarView extends Component<void, Props, void> {
  renderButton = (action: Action, index: number) => {
    return (<IconButton key={action.label} action={action} />)
  };

  render() {
    const {command} = this.props
    const viewerGroup = command.viewer.map(this.renderButton)
    const illustGroup = command.illust.map(this.renderButton)
    const helpGroup = command.help.map(this.renderButton)

    return (
      <div className="ToolBar">
        {viewerGroup}
        <div className="ToolBar-divider" />
        {illustGroup}
        <div className="ToolBar-bottom">
          {helpGroup}
        </div>
      </div>
    )
  }
}
