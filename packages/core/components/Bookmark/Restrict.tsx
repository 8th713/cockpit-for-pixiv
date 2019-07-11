import React from 'react'
import { Box } from '../shared/Box'
import { Switch } from '../shared/Switch'
import { Text } from '../shared/Text'

type Props = {
  value: boolean
  onChange: (value: { restrict: boolean }) => void
}

export function Restrict({ value, onChange }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Text as="span" mr={2}>
        非公開
      </Text>
      <Switch
        name="restrict"
        aria-label="非公開"
        checked={value}
        onChange={e => onChange({ restrict: e.target.checked })}
      />
    </Box>
  )
}
