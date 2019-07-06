import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Collections } from '../../shared/Icon'
import * as styles from '../../shared/styles'
import { Text } from '../../shared/Text'

export function Series() {
  const { useIllust } = useServices()
  const id = useRoute()[0]!
  const illust = useIllust(id)

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
  ${styles.link}
  ${styles.fontPresets.body2};
  white-space: nowrap;
`
