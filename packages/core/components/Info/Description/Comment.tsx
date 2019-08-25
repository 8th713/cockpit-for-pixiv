import React from 'react'
import styled from 'styled-components'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { Text } from '../../shared'
import { replaceJumpLink } from '../utils'

export function Comment() {
  const { useIllust } = useServices()
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return null
  if (!illust.illustComment) return null

  const comment = replaceJumpLink(illust.illustComment)

  return <Root textStyle="b2" dangerouslySetInnerHTML={{ __html: comment }} />
}

const Root = styled(Text)`
  word-break: break-word;
  a {
    cursor: pointer;
    color: var(--primary);
    :hover {
      text-decoration: none;
    }
    :focus {
      outline: auto currentColor;
    }
  }
`
