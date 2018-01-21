// @flow
import './styles/Editor.css'
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Dialog from '../shared/Dialog'
import Header from '../shared/Header'
import RouteView from './Route'
import CommentEditor from './CommentEditor'
import TagEditor from './TagEditor'
import RecommendTagList from './RecommendTagList'
import UserTagList from './UserTagList'
import Restrict from './Restrict'

import type {Account} from '../../store/account'
import type {Route} from '../../store/route'
import type {Editor} from '../../store/editor'
import type {UseCase} from '../../useCase'
import type Illust from '../../entity/illust'

type Props = {
  +account: Account,
  +route: Route,
  +editor: Editor,
  +useCase: UseCase,
}


@observer
export default class EditorView extends Component<void, Props, void> {
  handleClose = () => {
    this.props.useCase.editor.close()
  };

  handleSubmit = (event: SyntheticInputEvent) => {
    event.preventDefault()
    this.props.useCase.illust.bookmark()
  };

  renderContent = (illust: Illust) => {
    const {account, editor, useCase} = this.props

    return (
      <div className="Editor">
        <header className="Editor-header">
          <Header illust={illust} />
        </header>
        <div className="Editor-main">
          <img
            className="Editor-thumbnail"
            src={illust.thumbnail}
            alt={illust.title}
          />
          <form
            method="dialog"
            className="bookmark-detail-unit"
            onSubmit={this.handleSubmit}
          >
            <CommentEditor editor={editor} useCase={useCase} />
            <TagEditor editor={editor} useCase={useCase} />
            <RecommendTagList illust={illust} useCase={useCase} />
            <UserTagList editor={editor} account={account} useCase={useCase} />
            <div className="submit-container">
              <Restrict editor={editor} useCase={useCase} />
              <input
                type="submit"
                className="_button-large"
                value={'ブックマーク'}
              />
            </div>
          </form>
        </div>
      </div>
    )
  };

  render() {
    const {route, editor} = this.props

    return (
      <Dialog open={editor.opened} onClose={this.handleClose}>
        <RouteView
          route={route}
          editor={editor}
          children={this.renderContent}
        />
      </Dialog>
    )
  }
}
