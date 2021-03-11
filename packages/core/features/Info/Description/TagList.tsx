import { Flex } from '../../../shared/Box'
import { Link } from '../../../shared/Text'
import { styled } from '../../../stitches.config'

export type TagListProps = {
  isHowto?: boolean
  isOriginal?: boolean
  tags: Pixiv.IllustTag[]
  xRestrict: Pixiv.XRestrict
}

const getURL = (tag: string) => `tags/${encodeURIComponent(tag)}/artworks`

export const TagList = ({
  isHowto,
  isOriginal,
  tags,
  xRestrict,
}: TagListProps) => {
  const category = getCategory(xRestrict)

  return (
    <Flex typo="body" css={{ flexWrap: 'wrap', columnGap: '$3' }}>
      {category && (
        <BoldLink href={getURL(category)} css={{ color: '$secondary' }}>
          {category}
        </BoldLink>
      )}
      {isOriginal && (
        <BoldLink href={getURL('オリジナル')}>オリジナル</BoldLink>
      )}
      {isHowto && <BoldLink href="/howto">描き方</BoldLink>}
      {tags.map((tag) => (
        <TagLink key={tag.tag} href={getURL(tag.tag)}>
          {tag.tag}
        </TagLink>
      ))}
    </Flex>
  )
}

const BoldLink = styled(Link, {
  fontWeight: '$bold',
})

const TagLink = styled(Link, {
  '&::before': {
    content: '"#"',
  },
})

const getCategory = (value: Pixiv.XRestrict) => {
  switch (value) {
    case 1:
      return 'R-18'
    case 2:
      return 'R-18G'
    default:
      return false
  }
}

if (__DEV__) {
  BoldLink.displayName = 'BoldLink'
  TagLink.displayName = 'TagLink'
}
