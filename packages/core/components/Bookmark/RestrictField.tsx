import React from 'react'
import styled from 'styled-components'
import { CheckboxOff, CheckboxOn } from '../shared/Icon'
import { color, ripple } from '../theme'

type Props = {
  checked: boolean
  onChange: () => void
  children?: never
}

export function RestrictField(props: Props) {
  const { checked, onChange } = props

  return (
    <Layout type="button" onClick={onChange}>
      {checked ? <CheckboxOn c="primary" /> : <CheckboxOff c="textSecondary" />}
      <Text>非公開</Text>
    </Layout>
  )
}

const Layout = styled.button`
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  z-index: 0;
  display: flex;
  align-items: center;
  height: 36px;
  margin: 0;
  padding: 0 16px;
  border: 0;
  border-radius: 0;
  background: unset;
  color: ${color.surfaceText};
  font-size: 1em;
  line-height: 1.5em;
  font-weight: 400;
  letter-spacing: 0.03125em;
  ${ripple};
`
const Text = styled.span`
  padding: 0 16px 0 32px;
`
