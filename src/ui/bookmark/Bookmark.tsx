import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Modal } from '../shared/Modal'
import { Warning } from '../shared/Warning'
import { Progress } from '../shared/Progress'
import { Loadable } from '../shared/Loadable'
import { Header } from '../shared/Header'
import { CommentEditor } from './CommentEditor'
import { TagEditor } from './TagEditor'
import { RecommendTagList } from './RecommendTagList'
import { UserTagList } from './UserTagList'
import { RestrictEditor } from './RestrictEditor'
import { BookmarkStore } from '../../store'
import { light } from '../shared/variables'

interface Props {
  store: BookmarkStore
}

@observer
export class Bookmark extends React.Component<Props> {
  handleClose = () => {
    this.props.store.close()
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.store.submit()
  }

  render() {
    const { store } = this.props

    return (
      <Modal open={store.opened} onClose={this.handleClose}>
        <Root>
          {store.current ? <Header illust={store.current} /> : null}
          <Loadable
            data={store}
            onFetching={() => <Progress />}
            onRejected={() => <Warning>Bookmark load error</Warning>}
            onResolved={() => {
              const current = store.current!

              return (
                <Content method="dialog" onSubmit={this.handleSubmit}>
                  <Thumbnail src={current.thumbnail} alt={current.title} />
                  <fieldset disabled={current.bookmark.isUpdating}>
                    <Fields>
                      <CommentEditor store={store.attrs} />
                      <TagEditor store={store.attrs} />
                      <RecommendTagList store={store} />
                      <UserTagList store={store} />
                      <RestrictEditor store={store.attrs} />
                    </Fields>
                  </fieldset>
                </Content>
              )
            }}
          />
        </Root>
      </Modal>
    )
  }
}

const Root = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: 960px;
  height: fit-content;
  min-height: 50%;
  max-height: 100vh;
  margin: auto;
  padding: 0;
  border-radius: 2px;
  background-color: ${light.background.paper};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`

const Content = styled.form`
  display: grid;
  grid-template-columns: 256px 1fr;
`

const Thumbnail = styled.img`
  object-fit: contain;
  width: 256px;
  height: 320px;
  padding: 16px 0;
  background-color: ${light.background.appBar};
`

const Fields = styled.div`
  display: grid;
  grid-gap: 16px;
  padding: 16px;
`
