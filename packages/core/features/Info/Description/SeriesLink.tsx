import { CollectionsIcon } from '../../../shared/Icon'
import { TextWithIcon } from '../../../shared/Stat'
import { Link, Word } from '../../../shared/Text'

export interface SeriesLinkProps extends Pixiv.Series {
  userId: string
}

export function SeriesLink({
  userId,
  seriesId,
  title,
  order,
}: SeriesLinkProps) {
  return (
    <TextWithIcon icon={CollectionsIcon}>
      <Link href={`/user/${userId}/series/${seriesId}`}>{title}</Link>
      <Word>#{order}</Word>
    </TextWithIcon>
  )
}
