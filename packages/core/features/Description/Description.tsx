import css from '@styled-system/css'
import React from 'react'
import styled from 'styled-components'
import {
  BookmarkOnIcon,
  CollectionsIcon,
  DateTimeIcon,
  extend,
  Flex,
  HTMLText,
  Label,
  LikeIcon,
  Link,
  Text,
  ViewCountIcon,
  Box
} from '../../components'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

interface TagListProps {
  xRestrict: Pixiv.XRestrict
  isOriginal?: boolean
  isHowto?: boolean
  tags: Pixiv.IllustTag[]
}

interface SeriesProps extends Partial<Pixiv.Series> {
  userId: string
}

export const Description = () => (
  <React.Suspense fallback={null}>
    <Loader />
  </React.Suspense>
)

const Loader = () => {
  const id = useRouteId()
  const illust = useIllust(id)
  if (!illust) return null
  return <Success {...illust} />
}

const Success = ({
  description,
  xRestrict,
  isOriginal,
  isHowto,
  tags,
  likeCount,
  bookmarkCount,
  viewCount,
  uploadDate,
  userId,
  seriesNavData
}: Pixiv.Illust) => {
  return (
    <Box
      sx={{
        bg: 'surface',
        color: 'onSurface',
        variant: 'text.body2'
      }}
    >
      <HTMLText>{description}</HTMLText>
      <TagList
        xRestrict={xRestrict}
        isOriginal={isOriginal}
        isHowto={isHowto}
        tags={tags.tags}
      />
      <Flex sx={{ flexWrap: 'wrap' }}>
        <ListItem icon={LikeIcon}>{likeCount}</ListItem>
        <ListItem icon={BookmarkOnIcon}>{bookmarkCount}</ListItem>
        <ListItem icon={ViewCountIcon}>{viewCount}</ListItem>
        <ListItem icon={DateTimeIcon}>{formatDate(uploadDate)}</ListItem>
        <Series userId={userId} {...seriesNavData} />
      </Flex>
    </Box>
  )
}

const TAG_URL = '/search.php?s_mode=s_tag_full&word='
const TagList = ({ xRestrict, isOriginal, isHowto, tags }: TagListProps) => {
  const rating = xRestrict === 1 ? 'R-18' : xRestrict === 2 ? 'R-18G' : ''
  return (
    <TagListRoot>
      {rating && (
        <Link
          href={`${TAG_URL}${rating}`}
          sx={{ mr: 2, color: 'secondary', fontWeight: 500 }}
        >
          {rating}
        </Link>
      )}
      {isOriginal && (
        <Link href={`${TAG_URL}オリジナル`} sx={{ mr: 2, fontWeight: 500 }}>
          オリジナル
        </Link>
      )}
      {isHowto && (
        <Link href="/howto" sx={{ mr: 2, fontWeight: 500 }}>
          描き方
        </Link>
      )}
      {tags.map(tag => (
        <TagLink key={tag.tag} href={TAG_URL + encodeURIComponent(tag.tag)}>
          {tag.tag}
        </TagLink>
      ))}
    </TagListRoot>
  )
}

const TagListRoot = styled.div(
  extend({
    display: 'flex',
    flexWrap: 'wrap',
    mb: 3,
    ':empty': {
      display: 'none'
    }
  })
)

const TagLink = styled(Link)(
  css({
    mr: 2,
    '::before': {
      content: '"#"'
    }
  })
)

const Series = ({ userId, seriesId, title, order }: SeriesProps) => (
  <>
    {seriesId && (
      <ListItem icon={CollectionsIcon}>
        <Link href={`/user/${userId}/series/${seriesId}`}>{title}</Link>
        <Text sx={{ ml: 1 }}>#{order}</Text>
      </ListItem>
    )}
  </>
)

const ListItem = styled(Label)(
  css({
    mr: 3
  })
)

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString('ja-JP', {
    hour12: false,
    year: 'numeric',
    month: 'narrow',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

if (__DEV__) {
  Loader.displayName = 'Description.Loader'
  Success.displayName = 'Description.Success'
  TagList.displayName = 'Description.TagList'
  TagListRoot.displayName = 'Description.TagListRoot'
  TagLink.displayName = 'Description.TagLink'
  Series.displayName = 'Description.Series'
  ListItem.displayName = 'Description.ListItem'
}
