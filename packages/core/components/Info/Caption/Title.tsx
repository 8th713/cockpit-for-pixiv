import React from 'react'
import { useRouteId } from '../../Router'
import { useServices } from '../../Services'
import { Link } from '../../shared'

const prefix = '/member_illust.php?mode=medium&illust_id='

export function Title() {
  const { useIllust } = useServices()
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return null

  const { title } = illust
  return (
    <Link href={prefix + id} title={title} color="onSurface">
      {title}
    </Link>
  )
}
