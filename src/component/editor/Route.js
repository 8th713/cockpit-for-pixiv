// @flow
import {PureComponent} from 'react'
import {observer} from 'mobx-react'
import type Illust from '../../entity/illust'
import type {Route} from '../../store/route'
import type {Editor} from '../../store/editor'

type Props = {
  +route: Route;
  +editor: Editor;
  children(illust: Illust): React$Element<*>
}

@observer
export default class RouteView extends PureComponent<void, Props, void> {
  render() {
    const {route, editor, children} = this.props

    if (editor.opened && route.illust) {
      return children(route.illust)
    }

    return null
  }
}
