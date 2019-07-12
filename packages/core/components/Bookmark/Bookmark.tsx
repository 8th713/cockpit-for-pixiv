import React, { useState } from 'react'
import styled from 'styled-components'
import { BookmarkForm, Illust } from '../../interfaces'
import { bookmark } from '../Info/utils'
import { useServices } from '../Services'
import {
  BookmarkOn,
  Box,
  Button,
  Dialog,
  Modal,
  Progress,
  Refresh,
  Text
} from '../shared'
import { Comment } from './Comment'
import { Restrict } from './Restrict'
import { SortHost } from './SortHost'
import { Tags } from './Tags'
import { useToggleForm, useUpdateToggleForm } from './ToggleForm'
import { toPostData } from './utils'

interface Props {
  illust: Illust
}
interface SuspenseProps extends Props {}
interface LoaderProps extends Props {}
interface LoadingProps extends Props {}
interface FailureProps extends Props {}
interface SuccessProps extends Props {
  data: BookmarkForm
}

export function Bookmark(props: SuspenseProps) {
  const { title } = props.illust
  const [open, setOpen] = useToggleForm()
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog onBackdropClick={handleClose}>
        <Dialog.Header>
          <Text textStyle="h1">{title}</Text>
        </Dialog.Header>
        <Dialog.Divider />
        <React.Suspense fallback={<BookmarkLoading {...props} />}>
          <BookmarkLoader {...props} />
        </React.Suspense>
      </Dialog>
    </Modal>
  )
}
function BookmarkLoader({ illust }: LoaderProps) {
  const { useBookmarkForm } = useServices()
  const form = useBookmarkForm(illust.id)

  if (!form) return <BookmarkFailure illust={illust} />
  return <BookmarkSuccess illust={illust} data={form} />
}
function BookmarkLoading({ illust }: LoadingProps) {
  return (
    <Form>
      <Dialog.Content>
        <FlexBox>
          <Thumbnail src={illust.urls.thumb} />
          <Box display="flex" flexGrow={1}>
            <Progress />
          </Box>
        </FlexBox>
      </Dialog.Content>
    </Form>
  )
}
function BookmarkFailure({ illust }: FailureProps) {
  const { useBookmarkForm } = useServices()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    useBookmarkForm.remove(illust.id)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Dialog.Content>
        <FlexBox>
          <Thumbnail src={illust.urls.thumb} />
          <Box display="flex" flexGrow={1}>
            <Text color="error" m="auto">
              取得に失敗しました
            </Text>
          </Box>
        </FlexBox>
      </Dialog.Content>
      <Dialog.Divider />
      <Dialog.Action>
        <Button variant="contained" colors="error" type="submit">
          <Refresh size={18} mr={2} />
          再取得
        </Button>
      </Dialog.Action>
    </Form>
  )
}
function BookmarkSuccess({ illust, data }: SuccessProps) {
  const { useIllust, bookmarkBy } = useServices()
  const setOepn = useUpdateToggleForm()
  const [state, setState] = useState({
    restrict: !!data.restrict,
    comment: data.comment,
    tags: data.tags
  })
  const [disabled, setDisabled] = useState(false)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setOepn(false)
    useIllust.replace(illust.id, bookmark(illust, state.restrict))
    bookmarkBy(illust.id, toPostData(state)).finally(() =>
      useIllust.refresh(illust.id)
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Dialog.Content>
        <FlexBox>
          <Thumbnail src={illust.urls.thumb} />
          <Box flexGrow={1}>
            <Restrict
              value={state.restrict}
              onChange={value => setState({ ...state, ...value })}
            />
            <Comment
              value={state.comment}
              onChange={value => setState({ ...state, ...value })}
            />
            <SortHost>
              <Tags
                illustTags={illust.tags.tags}
                userTags={data.userTags}
                value={state.tags}
                onChange={(value, valid) => {
                  setState({ ...state, ...value })
                  setDisabled(!valid)
                }}
              />
            </SortHost>
          </Box>
        </FlexBox>
      </Dialog.Content>
      <Dialog.Divider />
      <Dialog.Action>
        <Button
          variant="contained"
          colors="primary"
          type="submit"
          disabled={disabled}
        >
          <BookmarkOn size={18} mr={2} color="crimson" />
          ブックマーク
        </Button>
      </Dialog.Action>
    </Form>
  )
}

const Form = styled.form`
  display: contents;
`
const FlexBox = styled(Box)`
  box-sizing: border-box;
  display: flex;
  width: 912px;
`
const Thumbnail = styled.img`
  all: unset;
  align-self: flex-start;
  position: sticky;
  top: 0;
  width: 240px;
  margin-right: 24px;
`
