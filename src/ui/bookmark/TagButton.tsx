import * as React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as cx from 'classnames'
import { BookmarkVM } from '../../store'
import { colors, dark } from '../shared/variables'

interface Props {
  store: BookmarkVM
  tag: {
    name: string
    className: string
  }
}

@observer
export class TagButton extends React.Component<Props> {
  @computed
  get active() {
    return this.props.store.includes(this.props.tag.name)
  }

  handleClick = () => {
    const { store, tag } = this.props

    if (this.active) {
      store.removeTag(tag.name)
    } else {
      store.addTag(tag.name)
    }
  }

  render() {
    const { tag } = this.props
    const className = cx(tag.className, { active: this.active })

    return (
      <Root type="button" className={className} onClick={this.handleClick}>
        {tag.name}
      </Root>
    )
  }
}

const Root = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  margin: 4px;
  border: none;
  border-radius: 2px;
  background-color: transparent;
  color: ${colors.primary};
  line-height: 1;

  &.active {
    background-color: ${colors.primary};
    color: ${dark.text.primary};
  }

  &.lev1 {
    padding: 2px 8px;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.02em;
  }

  &.lev2 {
    padding: 2px 8px;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 0.02em;
  }

  &.lev3 {
    padding: 4px 8px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.04em;
  }

  &.lev4 {
    padding: 4px 8px;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.04em;
  }

  &.lev5 {
    padding: 5px 8px;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.04em;
  }

  &.lev6 {
    padding: 5px 8px;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0em;
  }
`
