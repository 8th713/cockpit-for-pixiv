import React from 'react'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import { Collections, Link, Text } from '../../shared'

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
    <Text textStyle="b2" display="flex" alignItems="center" ellipsis>
      <Collections width="18" height="18" />
      <Link href={href} mx={2}>
        {title}
      </Link>
      [#{order}]
    </Text>
  )
}
