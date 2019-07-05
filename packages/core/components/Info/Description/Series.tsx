import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Collections } from '../../shared/Icon'
import { Text } from '../../shared/Text'

export function Series() {
  const { apiClient } = useServices()
  const id = useRoute()[0]!
  const illust = apiClient.useIllust(id)

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
