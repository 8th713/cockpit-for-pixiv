import * as React from 'react'
import styled from 'styled-components'
import { light } from '../shared/variables'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  count: string
  innerRef?: (instance: any) => void
}

export const CounterInput: React.SFC<Props> = ({ count, ...other }) => (
  <Root>
    <div>
      <Input {...other} />
    </div>
    <Count>{count}</Count>
  </Root>
)

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 96px;
  align-items: center;
  border: 1px solid #dde5ed;
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1) inset;
  background-color: #f2f4f6;
`

const Input = styled.input`
  &[type='text'] {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    border: none;
    padding: 0 10px;
    line-height: 18px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1) inset;
    font: inherit;
  }

  &:placeholder-shown {
    color: ${light.text.secondary};
  }
`

const Count = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`
