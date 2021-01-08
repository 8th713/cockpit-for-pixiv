import React from 'react'
import { Skeleton } from '../../../shared/Box'
import { Link } from '../../../shared/Text'
import type { IllustQueryResult } from '../illustQuery'

export type CaptionTitleProps = IllustQueryResult & {
  id: string
}

export const CaptionTitle = ({
  id,
  data,
  isLoading,
  isError,
}: CaptionTitleProps) =>
  isLoading ? (
    <Skeleton css={{ w: 256, h: 24 }} />
  ) : (
    <Link href={`/artworks/${id}`} css={{ color: 'inherit' }}>
      {isError || !data ? '取得できませんでした' : data.title}
    </Link>
  )
