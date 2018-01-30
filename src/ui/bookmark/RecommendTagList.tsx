import * as React from 'react'
import { observer } from 'mobx-react'
import { Progress } from '../shared/Progress'
import { Loadable } from '../shared/Loadable'
import { TagButton } from './TagButton'
import { TagList } from './TagList'
import { BookmarkStore } from '../../store'

interface Props {
  store: BookmarkStore
}

export const RecommendTagList = observer(({ store }: Props) => {
  const illust = store.current!

  return (
    <TagList title="この作品のタグ">
      <Loadable
        data={store}
        onFetching={() => <Progress />}
        onRejected={() => <Progress />}
        onResolved={() =>
          illust.tags.map(tag => (
            <TagButton
              key={tag.name}
              store={store.attrs}
              tag={{
                name: tag.name,
                className: 'lev6'
              }}
            />
          ))
        }
      />
    </TagList>
  )
})
