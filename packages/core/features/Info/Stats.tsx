import {
  BookmarkOnIcon,
  CollectionsIcon,
  DateTimeIcon,
  LikeIcon,
  ViewCountIcon,
} from '../../shared/Icons'
import { SkeletonText } from '../../shared/Skeleton'
import { TextWithIcon } from '../../shared/TextWithIcon'
import { styled } from '../../stitches.config'

export interface StatsProps {
  info?: Pixiv.IllustInfo
}

export function Stats({ info }: StatsProps) {
  const loaded = !!info

  return (
    <StatsContainer>
      <TextWithIcon title="いいね！" icon={LikeIcon}>
        <SkeletonText loaded={loaded}>
          {info && format(info.likeCount)}
        </SkeletonText>
      </TextWithIcon>
      <TextWithIcon title="ブックマーク" icon={BookmarkOnIcon}>
        <SkeletonText loaded={loaded}>
          {info && format(info.bookmarkCount)}
        </SkeletonText>
      </TextWithIcon>
      <TextWithIcon title="閲覧数" icon={ViewCountIcon}>
        <SkeletonText loaded={loaded}>
          {info && format(info.viewCount)}
        </SkeletonText>
      </TextWithIcon>
      <TextWithIcon title="投稿日時" icon={DateTimeIcon}>
        <SkeletonText loaded={loaded}>
          {info && format(info.createDate)}
        </SkeletonText>
      </TextWithIcon>
      <SeriesLink info={info} />
    </StatsContainer>
  )
}

const StatsContainer = styled('div', {
  baseStyle: true,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
})

function SeriesLink({ info }: StatsProps) {
  const userId = info?.userId
  const series = info && info.seriesNavData

  return series ? (
    <TextWithIcon title="シリーズ" icon={CollectionsIcon}>
      <LinkText href={`/user/${userId}/series/${series.seriesId}`}>
        {series.title}
      </LinkText>
      <span>#{series.order}</span>
    </TextWithIcon>
  ) : null
}

const LinkText = styled('a', {
  baseStyle: true,
  linkStyle: '$primary',
})

function format(value: number | string) {
  if (typeof value === 'number') {
    return value.toLocaleString()
  }
  return new Date(value).toLocaleString()
}
