import React from 'react'
import { CollectionsIcon, Link, Text } from '../../components'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

export const Series = () => {
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return null

  const { userId, seriesNavData } = illust

  if (!seriesNavData) return null

  const { seriesId, title, order } = seriesNavData
  const href = `/user/${userId}/series/${seriesId}`

  return (
    <Text
      textStyle="b2"
      display="flex"
      alignItems="center"
      textOverflow="ellipsis"
    >
      <CollectionsIcon width="18" height="18" />
      <Link href={href} mx={2}>
        {title}
      </Link>
      [#{order}]
    </Text>
  )
}
