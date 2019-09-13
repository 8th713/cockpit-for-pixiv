import React from 'react'
import styled from 'styled-components'
import { replaceJumpLink, Text } from '../../components'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

export const Comment = () => {
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
