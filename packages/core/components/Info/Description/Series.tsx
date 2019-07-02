import React from 'react'
import styled from 'styled-components'
import { Collections } from '../../shared/Icon'
import { Text } from '../../shared/Text'
import { useIllust } from '../IllustHost'

export function Series() {
  const { read } = useIllust()
  const illust = read()

  if (!illust) return null

  const { userId, seriesNavData } = illust

  if (!seriesNavData) return null

  const { seriesId, title, order } = seriesNavData
  const href = `/user/${userId}/series/${seriesId}`

  return (
    <Root>
      <Collections width="18" height="18" />
      <Link href={href}>{title}</Link>
      <Text as="span" kind="b2">
        [#{order}]
      </Text>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`
const Link = styled.a`
  margin: 0 8px;
  color: var(--primary);
  font-size: 0.875em;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  white-space: nowrap;
  :hover {
    text-decoration: none;
  }
  :focus {
    outline: auto currentColor;
  }
`
