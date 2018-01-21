// @flow
import './styles/Profile.css'
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Spinner from '../shared/Spinner'
import Header from '../shared/Header'
import ListItem from './ListItem'
import Caption from './Caption'
import TagList from './TagList'
import type {Viewer} from '../../store/viewer'
import type Illust from '../../entity/illust'

type Props = {
  +viewer: Viewer,
  +illust: Illust,
}

@observer
export default class Profile extends Component<void, Props, void> {
  renderContents(illust: Illust) {
    const {detail} = illust

    if (detail.isFetched) {
      return (
        <div className="Profile-body">
          <ListItem
            tip="投稿日時"
            icon="event"
            text={detail.date}
          />
          <ListItem
            tip="情報"
            icon="info"
            text={detail.description}
          />
          <ListItem
            tip="閲覧数"
            icon="pageview"
            text={detail.viewCount}
          />
          <ListItem
            tip="いいね！"
            icon="thumb_up"
            text={detail.rateCount}
          />
          <Caption children={detail.caption} />
          <TagList items={detail.tags} />
        </div>
      )
    }
    return (<Spinner center />)
  }

  render() {
    const {viewer, illust} = this.props

    if (!viewer.sidePanel) {
      return null
    }

    return (
      <div className="Profile">
        <header className="Profile-header">
          <Header illust={illust} />
        </header>
        {this.renderContents(illust)}
      </div>
    )
  }
}
