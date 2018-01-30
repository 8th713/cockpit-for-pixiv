import * as React from 'react'
import styled from 'styled-components'
import { Icon } from '../shared/Icon'
import { colors, light, typography } from '../shared/variables'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean
  label: React.ReactNode
  description: React.ReactNode
}

export const CheckBox: React.SFC<Props> = ({
  label,
  description,
  checked,
  ...props
}) => {
  return (
    <Root>
      <CheckboxNative checked={checked} onChange={props.onChange} />
      <CheckMark checked={checked} />
      <div>
        <ListTitle>{label}</ListTitle>
        <p>{description}</p>
      </div>
    </Root>
  )
}

const Root = styled.label`
  box-sizing: border-box;
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  min-height: 72px;
  margin: 0;
  padding: 12px 16px;
  transition: background-color 255ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus-within {
    background-color: ${light.action.hover};
  }
`

const CheckboxNative = styled.input.attrs({
  type: 'checkbox'
})`
  -webkit-appearance: none;
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 !important;
  padding: 0;
  opacity: 0;
`

const CheckMark = ({ checked }: { checked: boolean }) => (
  <Icon style={{ color: checked ? colors.primary : light.action.active }}>
    {checked ? (
      <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
    ) : (
      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
    )}
  </Icon>
)

const ListTitle = styled.div`
  ${typography.subhead};
`
