import * as React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Header } from '../shared/Header'
import { Warning } from '../shared/Warning'
import { Progress } from '../shared/Progress'
import { Loadable } from '../shared/Loadable'
import {
  Date,
  Description,
  ViewCount,
  RateCount,
  Caption,
  Tag
} from '../shared/Icon'
import { Illust } from '../../store'
import { colors, light } from '../shared/variables'

interface Props {
  illust: Illust
}

@observer
export class InfoArticle extends React.Component<Props> {
  @computed
  get description(): string {
    const { page, restrict, xRestrict } = this.props.illust
    const rLabel = restrictLabels[restrict]
    const xLabel = xRestrictLabels[xRestrict]
    const description = `${page}p / ${rLabel} / ${xLabel}`

    return description
  }

  render() {
    const { illust } = this.props

    return (
      <Root>
        <Header illust={this.props.illust} />
        <Loadable
          data={illust}
          onFetching={() => <Progress />}
          onRejected={() => <Warning>Illust details load error</Warning>}
          onResolved={() => (
            <>
              <ListItem>
                <Date />
                <Text>{illust.date}</Text>
              </ListItem>
              <ListItem>
                <Description />
                <Text>{this.description}</Text>
              </ListItem>
              <ListItem>
                <ViewCount />
                <Text>{illust.viewCount}</Text>
              </ListItem>
              <ListItem>
                <RateCount />
                <Text>{illust.likeCount}</Text>
              </ListItem>
              <Divider />
              <ListItem>
                <Caption />
                <Text
                  dangerouslySetInnerHTML={{ __html: illust.illustComment }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <Tag />
                <Text>
                  {illust.tags.map(tag => (
                    <TagLink
                      key={tag.tag}
                      href={`/search.php?s_mode=s_tag_full&word=${tag.tag}`}
                    >
                      {tag.tag}
                    </TagLink>
                  ))}
                </Text>
              </ListItem>
            </>
          )}
        />
      </Root>
    )
  }
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const ListItem = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 56px 1fr;
  min-height: 48px;
  padding: 12px 16px;

  & > svg {
    color: ${light.action.active};
  }

  & a {
    color: ${colors.primary};
  }
`

const Text = styled.div`
  overflow: auto;
  overflow-wrap: break-word;
  align-self: center;
`

const TagLink = styled.a`
  display: inline-block;
  margin-right: 8px;
  &::before {
    content: '#';
  }
`

const Divider = styled.hr`
  height: 1px;
  margin: 0;
  border: none;
  background-color: ${light.divider};
`

const restrictLabels = {
  '0': '公開',
  '1': 'マイピク',
  '2': '非公開'
}

const xRestrictLabels = {
  '0': '規制なし',
  '1': 'R-18',
  '2': 'R-18G'
}
