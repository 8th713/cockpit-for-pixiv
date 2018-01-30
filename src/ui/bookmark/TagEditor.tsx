import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { CounterInput } from './CounterInput'
import { BookmarkVM } from '../../store'
import { typography, light } from '../shared/variables'

interface Props {
  store: BookmarkVM
}

@observer
export class TagEditor extends React.Component<Props> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.store.update({
      tags: event.target.value
    })
  }

  render() {
    const { store } = this.props

    return (
      <div>
        <CounterInput
          type="text"
          placeholder="ブックマークタグ"
          name="tag"
          maxLength={1024}
          value={store.tags}
          onChange={this.handleChange}
          count={store.tagCount}
        />
        <Helper>
          <Alert hidden={store.tagValid}>
            タグは10個までしか登録できません。
          </Alert>
          <span>
            *スペース区切りで10個まで登録できます。英数字等は半角に統一されます。
          </span>
        </Helper>
      </div>
    )
  }
}

const Helper = styled.div`
  margin-top: 0.5em;
  color: ${light.text.secondary};
  ${typography.caption};
`

const Alert = styled.span`
  margin-right: 6px;
  color: #f44336;
`
