import React from 'react'
import styled from 'styled-components'
import { Link, Text } from '../../components'
import { useIllust } from '../Illust'
import { useRouteId } from '../Router'

const TAG_URL = '/search.php?s_mode=s_tag_full&word='

export const TagList = () => {
  const id = useRouteId()
  const illust = useIllust(id)

  if (!illust) return null

  const { xRestrict, isOriginal, isHowto } = illust
  const rating = xRestrict === 1 ? 'R-18' : xRestrict === 2 ? 'R-18G' : ''
  const { tags } = illust.tags

  return (
    <Text as="div" textStyle="b2" display="flex" flexWrap="wrap">
      {rating && (
        <BoldLink
          href={`/search.php?s_mode=s_tag_full&word=${rating}`}
          color="error"
          mr={2}
        >
          {rating}
        </BoldLink>
      )}
      {isOriginal && (
        <BoldLink href="/search.php?s_mode=s_tag_full&word=オリジナル" mr={2}>
          オリジナル
        </BoldLink>
      )}
      {isHowto && (
        <BoldLink href="/howto" mr={2}>
          描き方
        </BoldLink>
      )}
      {tags.map(tag => (
        <TagLink
          key={tag.tag}
          href={TAG_URL + encodeURIComponent(tag.tag)}
          mr={2}
        >
          {tag.tag}
        </TagLink>
      ))}
    </Text>
  )
}

const BoldLink = styled(Link)`
  font-weight: 500;
`
const TagLink = styled(Link)`
  ::before {
    content: '#';
  }
`
