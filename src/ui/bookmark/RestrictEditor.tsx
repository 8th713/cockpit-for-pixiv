import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { BookmarkVM } from '../../store'
import { colors, dark, typography } from '../shared/variables'

interface Props {
  store: BookmarkVM
}

@observer
export class RestrictEditor extends React.Component<Props> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.store.update({
      restrict: Number(event.target.value) as 0 | 1
    })
  }

  render() {
    const { store } = this.props

    return (
      <Root>
        <Label>
          <Radiobox
            value={0}
            checked={store.restrict === 0}
            onChange={this.handleChange}
          />
          <span>公開</span>
        </Label>
        <Label>
          <Radiobox
            value={1}
            checked={store.restrict === 1}
            onChange={this.handleChange}
          />
          <span>非公開</span>
        </Label>
        <Space />
        <Submit />
      </Root>
    )
  }
}

const Root = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 88px;
`

const Radiobox = styled.input.attrs({
  type: 'radio',
  name: 'restrict'
})`
  label &[type='radio'] {
    margin: 8px;
  }
`

const Space = styled.div`
  flex-grow: 1;
`

const Submit = styled.input.attrs({
  type: 'submit',
  value: 'ブックマーク'
})`
  box-sizing: border-box;
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  min-height: 36px;
  flex: 0 0 auto;

  margin: 0;
  padding: 8px 16px;
  border: 0;
  border-radius: 2px;

  background-color: ${colors.primary};
  color: ${dark.text.primary};
  text-align: center;
  text-decoration: none;
  ${typography.button};

  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
`
