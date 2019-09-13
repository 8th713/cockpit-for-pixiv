import React from 'react'
import { Link } from '../../components'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

const PREFIX = '/member_illust.php?mode=medium&illust_id='

export const Title = () => {
  const illustId = useRouteId()
  const illust = useIllust(illustId)

  if (!illust) return null

  const { title } = illust
  const href = PREFIX + illustId
  return (
    <Link href={href} title={title} color="onSurface">
      {title}
    </Link>
  )
}
