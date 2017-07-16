// @flow
import './styles/View.css'
import {observer} from 'mobx-react'
import React, {PureComponent} from 'react'
import Dialog from '../shared/Dialog'
import ToolBarView from '../shared/ToolBar'
import Profile from '../profile/Profile'
import Canvas from '../canvas/Canvas'
import RouteView from './Route'
import type {Route} from '../../store/route'
import type {Viewer} from '../../store/viewer'
import type {Command} from '../../store/command'
import type {UseCase} from '../../useCase'
import type Illust from '../../entity/illust'

type Props = {
  +route: Route,
  +viewer: Viewer,
  +command: Command,
  +useCase: UseCase,
}

@observer
export default class View extends PureComponent<void, Props, void> {
  handleClose = () => {
    this.props.useCase.route.close()
  };

  renderContent = (illust: Illust) => {
    const {viewer, command, useCase} = this.props

    return (
      <div className="View">
        <Profile viewer={viewer} illust={illust} />
        <div className="View-main">
          <ToolBarView command={command} />
          <Canvas images={illust.images} useCase={useCase} />
        </div>
      </div>
    )
  };

  render() {
    const {route} = this.props

    return (
      <Dialog open={route.opened} onClose={this.handleClose}>
        <RouteView route={route} children={this.renderContent} />
      </Dialog>
    )
  }
}
