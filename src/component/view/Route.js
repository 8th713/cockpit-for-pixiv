// @flow
import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import Spinner from '../shared/Spinner'
import type Illust from '../../entity/illust'
import type {Route} from '../../store/route'

type Props = {
  +route: Route;
  children(illust: Illust): React$Element<*>
}

@observer
export default class RouteView extends PureComponent<void, Props, void> {
  render() {
    const {route, children} = this.props

    if (route.illust) {
      return children(route.illust)
    }

    return (<Spinner center size={256} />)
  }
}
