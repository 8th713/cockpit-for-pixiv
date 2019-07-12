import React from 'react'
import { Box, Switch, Text } from '../shared'

type Props = {
  value: boolean
  onChange: (value: { restrict: boolean }) => void
}

export function Restrict({ value, onChange }: Props) {
  return (
    <Box display="flex" alignItems="center">
      <Text as="span" mr={2} em="high">
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
