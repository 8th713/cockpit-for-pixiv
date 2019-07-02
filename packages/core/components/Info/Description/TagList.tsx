import React from 'react'
import styled from 'styled-components'
import { useIllust } from '../IllustHost'

const tagURL = '/search.php?s_mode=s_tag_full&word='

export function TagList() {
  const { read } = useIllust()
  const illust = read()

  if (!illust) return null

  const { xRestrict, isOriginal, isHowto } = illust
  const rating = xRestrict === 1 ? 'R-18' : xRestrict === 2 ? 'R-18G' : ''
  const { tags } = illust.tags

  return (
    <Root>
      {rating && (
        <RedLink href={`/search.php?s_mode=s_tag_full&word=${rating}`}>
          {rating}
        </RedLink>
      )}
      {isOriginal && (
        <BoldLink href="/search.php?s_mode=s_tag_full&word=オリジナル">
          オリジナル
        </BoldLink>
      )}
      {isHowto && <BoldLink href="/howto">描き方</BoldLink>}
      {tags.map(tag => (
        <TagLink key={tag.tag} href={tagURL + encodeURIComponent(tag.tag)}>
          {tag.tag}
        </TagLink>
      ))}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Link = styled.a`
  margin-right: 8px;
  color: var(--primary);
  font-size: 0.875em;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  white-space: nowrap;
  :hover {
    text-decoration: none;
  }
  :focus {
    outline: auto currentColor;
  }
`
const BoldLink = styled(Link)`
  font-weight: 500;
`
const RedLink = styled(BoldLink)`
  color: var(--error);
`
const TagLink = styled(Link)`
  ::before {
    content: '#';
  }
`
