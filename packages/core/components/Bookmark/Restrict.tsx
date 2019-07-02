import React from 'react'
import styled from 'styled-components'
import { Switch } from '../shared/Switch'
import { Text } from '../shared/Text'

type Props = {
  value: boolean
  onChange: (value: { restrict: boolean }) => void
}

export function Restrict({ value, onChange }: Props) {
  return (
    <Root>
      <Label as="span">非公開</Label>
      <Switch
        name="restrict"
        aria-label="非公開"
        checked={value}
        onChange={e => onChange({ restrict: e.target.checked })}
      />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
`
const Label = styled(Text)`
  margin-right: 8px;
`
