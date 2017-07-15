// @flow
import './styles/Header.css'
import React, {PureComponent} from 'react'
import type Illust from '../../entity/illust'

type Props = {
  +illust: Illust,
}

export default class Header extends PureComponent<void, Props, void> {
  render() {
    const {illust} = this.props

    return (
      <div className="Header">
        <img
          className="Header-avatar"
          src={illust.avatar}
          alt={illust.userName}
          width="40"
          height="40"
        />
        <div className="Header-links">
          <div className="Header-link">
            <a
              className="Header-title"
              href={illust.href}
              title={illust.title}
            >{illust.title}</a>
          </div>
          <div className="Header-link">
            <a
              className="Header-name"
              href={illust.userHref}
              title={illust.userName}
            >{illust.userName}</a>
          </div>
        </div>
      </div>
    )
  }
}
