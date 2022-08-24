import { SkeletonText } from '../../shared/Skeleton'
import { styled } from '../../stitches.config'

export interface TagListProps {
  info?: Pixiv.IllustInfo
}

export function TagList({ info }: TagListProps) {
  if (!info)
    return (
      <TagListContainer short>
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
      </TagListContainer>
    )

  const category = getCategory(info.xRestrict)
  const {
    isOriginal,
    isHowto,
    tags: { tags },
  } = info

  return (
    <TagListContainer>
      {category && (
        <TagLink type="accept" href={createURL(category)}>
          {category}
        </TagLink>
      )}
      {isOriginal && (
        <TagLink type="bold" href={createURL('オリジナル')}>
          オリジナル
        </TagLink>
      )}
      {isHowto && (
        <TagLink type="bold" href="/howto">
          描き方
        </TagLink>
      )}
      {tags.map((tag) => (
        <TagLink key={tag.tag} type="tag" href={createURL(tag.tag)}>
          {tag.tag}
        </TagLink>
      ))}
    </TagListContainer>
  )
}

const TagListContainer = styled('div', {
  baseStyle: true,
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '$2',
  rowGap: '$1',
  variants: {
    short: {
      true: { maxWidth: 400 },
    },
  },
})

const TagLink = styled('a', {
  baseStyle: true,
  linkStyle: '$primary',
  variants: {
    type: {
      accept: { color: '$secondary', fontWeight: 'bold' },
      bold: { fontWeight: 'bold' },
      tag: { '&::before': { content: '"#"' } },
    },
  },
})

function getCategory(value: Pixiv.XRestrict) {
  switch (value) {
    case 1:
      return 'R-18'
    case 2:
      return 'R-18G'
    default:
      return false
  }
}

function createURL(tagName: string) {
  return `/tags/${encodeURIComponent(tagName)}/artworks`
}
