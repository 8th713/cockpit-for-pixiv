import React from 'react'
import styled from 'styled-components'
import { Text } from '../../shared/Text'
import { useIllust } from '../IllustHost'

export function Comment() {
  const { read } = useIllust()
  const illust = read()

  if (!illust) return null

  const comment = illust.illustComment.trim()

  return <Root kind="b2" dangerouslySetInnerHTML={{ __html: comment }} />
}

const Root = styled(Text)`
  word-break: break-word;
  a {
    all: unset;
    cursor: pointer;
    color: var(--primary);
  }
  a:focus {
    outline: auto currentColor;
  }
`
