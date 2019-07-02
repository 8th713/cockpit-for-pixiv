import React from 'react'
import styled from 'styled-components'
import { TextField } from '../shared/TextField'

type Props = {
  value: string
  onChange: (value: { comment: string }) => void
}

const MAX_LENGTH = 140

export function Comment({ value, onChange }: Props) {
  return (
    <Root>
      <TextField
        type="text"
        name="comment"
        maxLength={MAX_LENGTH}
        value={value}
        onChange={e => onChange({ comment: e.target.value })}
      >
        ブックマークコメント
      </TextField>
      <TextField.HelperLine>
        <div />
        <TextField.Counter>
          {value.length} / {MAX_LENGTH}
        </TextField.Counter>
      </TextField.HelperLine>
    </Root>
  )
}

const Root = styled.div`
  margin-top: 24px;
`
