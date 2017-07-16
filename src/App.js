// @flow
import React, {PureComponent} from 'react'
import route from './store/route'
import viewer from './store/viewer'
import account from './store/account'
import editor from './store/editor'
import help from './store/help'
import command from './store/command'
import useCase from './useCase'
import MainView from './component/view/View'
import EditorView from './component/editor/Editor'
import HelpView from './component/help/Help'
import './action'

export default class App extends PureComponent<void, {}, void> {
  render() {
    return (
      <div>
        <MainView
          route={route}
          viewer={viewer}
          command={command}
          useCase={useCase}
        />
        <EditorView
          account={account}
          route={route}
          editor={editor}
          useCase={useCase}
        />
        <HelpView
          help={help}
          command={command}
          useCase={useCase}
        />
      </div>
    )
  }
}
