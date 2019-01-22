import React from 'react'
import styled from 'styled-components'
import { color } from '../theme'
import { Illust, BookmarkPost } from '../../interfaces'
import { Content } from './Content'
import { Dialog } from '../shared/Dialog'
import { Button } from '../shared/Button'
import { Progress } from '../shared/Progress'

type Props = {
  illust: Illust
  open: boolean
  onRequestClose: () => void
  onSubmit: (post: BookmarkPost) => void
  children?: never
}

export function Bookmark({ illust, ...props }: Props) {
  const id = 'cockpit-bookmark-form'

  return (
    <Dialog {...props}>
      <Dialog.Header>
        <Title>{illust.illustTitle}</Title>
      </Dialog.Header>
      <Divider />
      <Dialog.Content>
        <Layout>
          <Thumbnail src={illust.urls.thumb} />
          <React.Suspense
            fallback={
              <div>
                <Progress />
              </div>
            }
          >
            <Content id={id} illust={illust} onSubmit={props.onSubmit} />
          </React.Suspense>
        </Layout>
      </Dialog.Content>
      <Divider />
      <Dialog.Footer>
        <Button v="contained" c="primary" type="submit" form={id}>
          ブックマーク
        </Button>
      </Dialog.Footer>
    </Dialog>
  )
}

const Title = styled.h1`
  all: unset;
  display: block;
  color: ${color.surfaceText};
  font-size: 1.25em;
  line-height: 2em;
  font-weight: 500;
  letter-spacing: 0.0125em;
`
const Layout = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 912px;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  align-items: start;
`
const Divider = styled.hr`
  all: unset;
  display: block;
  min-height: 1px;
  margin: 0 16px;
  background-color: ${color.divider};
`
const Thumbnail = styled.img`
  position: sticky;
  top: 8px;
  width: 240px;
  margin-top: 8px;
`
