// @flow
import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import Spinner from '../shared/Spinner'
import TagList from './TagList'
import type {UseCase} from '../../useCase'
import type Illust from '../../entity/illust'

type Props = {
  +useCase: UseCase,
  +illust: Illust,
}

@observer
export default class RecommendTagList extends PureComponent<void, Props, void> {
  renderWrapper(children: any) {
    return (
      <div>
        <p>この作品のタグ</p>
        {children}
      </div>
    )
  }

  render() {
    const {illust, useCase} = this.props
    const {detail} = illust

    if (detail.isLoading) {
      return this.renderWrapper(<Spinner />)
    }
    if (detail.isFetched) {
      return this.renderWrapper(
        <TagList useCase={useCase} items={detail.tags} />
      )
    }
    return this.renderWrapper()
  }
}
