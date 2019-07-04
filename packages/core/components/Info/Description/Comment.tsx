import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Text } from '../../shared/Text'

export function Comment() {
  const { apiClient } = useServices()
  const { read } = apiClient.useIllust()
  const id = useRoute()[0]!
  const illust = read(id)

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
