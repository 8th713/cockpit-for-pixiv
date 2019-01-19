import React from 'react'
import styled from 'styled-components'
import { color } from '../../theme'
import { Illust } from '../../../interfaces'
import { Text } from '../../shared/Text'

const tagURL = '/search.php?s_mode=s_tag_full&word='

type Props = {
  illust: Illust
  children?: never
}

export function TagList({ illust }: Props) {
  const { xRestrict, isOriginal, isHowto } = illust
  const rating = xRestrict === 1 ? 'R-18' : xRestrict === 2 ? 'R-18G' : ''
  const { tags } = illust.tags
  const tagList = React.useMemo(
    () =>
      tags.map(tag => (
        <Tag key={tag.tag} href={tagURL + encodeURIComponent(tag.tag)}>
          {tag.tag}
        </Tag>
      )),
    tags
  )

  return (
    <Layout v="b2">
      {rating && (
        <ALink href={`/search.php?s_mode=s_tag_full&word=${rating}`}>
          {rating}
        </ALink>
      )}
      {isOriginal && (
        <BLink href="/search.php?s_mode=s_tag_full&word=オリジナル">
          オリジナル
        </BLink>
      )}
      {isHowto && <BLink href="/howto">描き方</BLink>}
      {tagList}
    </Layout>
  )
}

const Layout = styled(Text)`
  display: flex;
  flex-wrap: wrap;
`
const Link = styled.a`
  && {
    margin-right: 8px;
    white-space: nowrap;
  }
`
const BLink = styled(Link)`
  && {
    font-weight: 500;
  }
`
const ALink = styled(BLink)`
  && {
    color: ${color.error};
  }
`
const Tag = styled(Link)`
  ::before {
    content: '#';
  }
`
