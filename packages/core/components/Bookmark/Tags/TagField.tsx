import React from 'react'
import styled from 'styled-components'
import { Text } from '../../shared/Text'
import { TextField } from '../../shared/TextField'
import { color } from '../../theme'
import { countTags } from '../utils'

const MAX = 10

type Props = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  children?: never
}

export function TagField(props: Props) {
  const count = countTags(props.value)
  const invalid = count > MAX
  const text = `${count}/${MAX}`

  return (
    <Layout>
      <TextField type="text" {...props} invalid={invalid}>
        ブックマークタグ
      </TextField>
      <HelperBox>
        <Helper v="caption">
          スペース区切りで10個まで登録できます。英数字等は半角に統一されます。
        </Helper>
        <Helper v="caption" c={invalid ? 'error' : 'default'}>
          {text}
        </Helper>
      </HelperBox>
    </Layout>
  )
}

const Layout = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${color.surface};
`
const HelperBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`
const Helper = styled(Text)`
  margin-top: 2px;
  padding: 0 12px;
`
