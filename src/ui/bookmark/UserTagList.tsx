import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Progress } from '../shared/Progress'
import { Loadable } from '../shared/Loadable'
import { TagButton } from './TagButton'
import { TagList } from './TagList'
import { SortBy, BookmarkStore } from '../../store'
import { colors } from '../shared/variables'

interface Props {
  store: BookmarkStore
}

@observer
export class UserTagList extends React.Component<Props> {
  componentDidMount() {
    this.props.store.userTag.loadIfNeeded()
  }

  handleNameClick = () => {
    this.props.store.userTag.changeSort(SortBy.NAME)
  }

  handleTotalClick = () => {
    this.props.store.userTag.changeSort(SortBy.TOTAL)
  }

  render() {
    const { userTag, attrs } = this.props.store

    return (
      <TagList
        title="あなたのブックマークタグ"
        helper={
          <>
            <Button type="button" onClick={this.handleNameClick}>
              名前順{userTag.sortBy === SortBy.NAME && userTag.sortDirection}
            </Button>
            <Button type="button" onClick={this.handleTotalClick}>
              件数順{userTag.sortBy === SortBy.TOTAL && userTag.sortDirection}
            </Button>
          </>
        }
      >
        <Loadable
          data={userTag}
          onFetching={() => <Progress />}
          onRejected={() => <Progress />}
          onResolved={() =>
            userTag.sorted.map(tag => (
              <TagButton
                key={tag.name}
                store={attrs}
                tag={{
                  name: tag.name,
                  className: tag.className
                }}
              />
            ))
          }
        />
      </TagList>
    )
  }
}

const Button = styled.button`
  cursor: pointer;
  min-width: 88px;
  border: none;
  border-radius: 2px;
  background-color: transparent;
  color: ${colors.primary};
  font: inherit;
`
