import { Skeleton } from '../../../shared/Box'
import { Link } from '../../../shared/Text'
import type { IllustQueryResult } from '../illustQuery'

export type CaptionTitleProps = IllustQueryResult & {
  id: string
}

export function CaptionTitle({
  id,
  data,
  isLoading,
  isError,
}: CaptionTitleProps) {
  return isLoading ? (
    <Skeleton css={{ w: 256, h: 24 }} />
  ) : (
    <Link href={`/artworks/${id}`} css={{ color: 'inherit' }}>
      {isError || !data ? '取得できませんでした' : data.title}
    </Link>
  )
}
