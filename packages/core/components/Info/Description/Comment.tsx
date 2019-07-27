import React from 'react'
import styled from 'styled-components'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { Text } from '../../shared'

const ANKER_TAG = /\<a href=".+?"/
const replaceJumpLink = (comment: string) => {
  const doc = new DOMParser().parseFromString(comment, 'text/html')
  const links = doc.getElementsByTagName('a')
  for (const link of links) {
    if (link.pathname === '/jump.php') {
      link.href = unescape(link.search.slice(1))
      link.referrerPolicy = 'no-referrer'
    }
  }
  return doc.body.innerHTML
}

export function Comment() {
  const { useIllust } = useServices()
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return null
  if (!illust.illustComment) return null

  let comment = illust.illustComment
  if (ANKER_TAG.test(comment)) {
    comment = replaceJumpLink(illust.illustComment)
  }

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
