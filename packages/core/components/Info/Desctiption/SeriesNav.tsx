import React from 'react'
import styled from 'styled-components'
import { Illust } from '../../../interfaces'
import { Collections } from '../../shared/Icon'
import { Text } from '../../shared/Text'

type Props = {
  illust: Illust
  children?: never
}

export function SeriesNav({ illust }: Props) {
  const { seriesNavData } = illust

  if (!seriesNavData) return null

  const { userId } = illust
  const { seriesId, title, order } = seriesNavData
  const href = `/user/${userId}/series/${seriesId}`

  return (
    <Layout v="b2">
      <Collections width="18" height="18" />
      <a href={href}>{title}</a>
      <span>[#{order}]</span>
    </Layout>
  )
}

const Layout = styled(Text)`
  display: grid;
  grid-template-columns: 18px auto auto;
  gap: 8px;
  align-items: center;
  justify-content: start;
  white-space: nowrap;
`
