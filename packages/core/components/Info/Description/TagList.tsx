import React from 'react'
import styled from 'styled-components'
import { useRoute } from '../../Router'
import { useServices } from '../../Services'
import * as styles from '../../shared/styles'

const tagURL = '/search.php?s_mode=s_tag_full&word='

export function TagList() {
  const { useIllust } = useServices()
  const id = useRoute()[0]!
  const illust = useIllust(id)

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
  ${styles.link};
  ${styles.fontPresets.body2};
  white-space: nowrap;
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
