// @flow
import './styles/UserTagList.css'
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Spinner from '../shared/Spinner'
import TagList from './TagList'
import type {UseCase} from '../../useCase'
import type {Account} from '../../store/account'

type Props = {
  +useCase: UseCase,
  +account: Account,
}

@observer
export default class UserTagList extends Component<void, Props, void> {
  handleNameClick = () => {
    this.props.useCase.account.sortBy('name')
  };

  handleTotalClick = () => {
    this.props.useCase.account.sortBy('total')
  };

  getLabel(label: string, type: string) {
    const {sortBy, sortDirection} = this.props.account
    const selected = type === sortBy
    const arrow = (sortDirection === 'asc') ? '↑' : '↓'

    if (selected) {
      return `${label}${arrow}`
    }
    return label
  }

  renderWrapper(children: any) {
    const nameLabel = this.getLabel('名前順', 'name')
    const totalLabel = this.getLabel('件数順', 'total')

    return (
      <div className="UserTagList">
        <div className="UserTagList-header">
          <p>あなたのブックマークタグ</p>
          <p>
            <button type="button" onClick={this.handleNameClick}>{nameLabel}</button>
            <button type="button" onClick={this.handleTotalClick}>{totalLabel}</button>
          </p>
        </div>
        {children}
      </div>
    )
  }

  render() {
    const {useCase, account} = this.props

    if (account.isLoading) {
      return this.renderWrapper(
        <Spinner />
      )
    }
    if (account.isFetched) {
      return this.renderWrapper(
        <TagList items={account.sortedTags} useCase={useCase} />
      )
    }
    return this.renderWrapper()
  }
}
