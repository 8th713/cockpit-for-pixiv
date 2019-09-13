import React, { useState } from 'react'
import styled from 'styled-components'
import {
  BookmarkOnIcon,
  Box,
  Button,
  Dialog,
  Modal,
  Progress,
  RefreshIcon,
  Text
} from '../../components'
import { fetchBookmarkForm } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'
import { bookmark, bookmarkBy, useIllust } from '../Illust'
import { CommentField } from './CommentField'
import { RestrictField } from './RestrictField'
import { TagField } from './TagField'
import { IllustTagList, UserTagList } from './TagList'
import { splitTags, validate } from './utils'

interface SuspenseProps {
  illust: Pixiv.Illust
  open: boolean
  onClose: () => void
}
interface LoaderProps {
  illust: Pixiv.Illust
  onClose: () => void
}
interface LoadingProps {
  thumbnail: string
}
interface FailureProps extends Pixiv.Illust {}
interface SuccessProps extends LoaderProps {
  fields: Pixiv.BookmarkForm
}

const useBookmarkForm = createCache(fetchBookmarkForm, 1)
export const BookmarkDialog = ({ illust, open, onClose }: SuspenseProps) => {
  const { title, urls } = illust

  return (
    <Modal open={open} onClose={onClose}>
      <Dialog onBackdropClick={onClose}>
        <Dialog.Header>
          <Text textStyle="h1">{title}</Text>
        </Dialog.Header>
        <Dialog.Divider />
        <React.Suspense fallback={<BookmarkLoading thumbnail={urls.thumb} />}>
          <BookmarkLoader illust={illust} onClose={onClose} />
        </React.Suspense>
      </Dialog>
    </Modal>
  )
}
const BookmarkLoader = (props: LoaderProps) => {
  const fields = useBookmarkForm(props.illust.id)

  if (!fields) return <BookmarkFailure {...props.illust} />
  return <BookmarkSuccess {...props} fields={fields} />
}
const BookmarkLoading = ({ thumbnail }: LoadingProps) => (
  <Form>
    <Dialog.Content>
      <FlexBox>
        <Thumbnail src={thumbnail} />
        <Box display="flex" flexGrow={1}>
          <Progress />
        </Box>
      </FlexBox>
    </Dialog.Content>
  </Form>
)
const BookmarkFailure = ({ illustId, urls }: FailureProps) => (
  <Form
    onSubmit={e => {
      e.preventDefault()
      useBookmarkForm.remove(illustId)
    }}
  >
    <Dialog.Content>
      <FlexBox>
        <Thumbnail src={urls.thumb} />
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
        <RefreshIcon size={18} mr={2} />
        再取得
      </Button>
    </Dialog.Action>
  </Form>
)
const BookmarkSuccess = ({ illust, fields, onClose }: SuccessProps) => {
  const [state, setState] = useState(() => ({
    restrict: fields.restrict,
    comment: fields.comment,
    tags: fields.tags
  }))
  const currentFields = {
    restrict: state.restrict,
    comment: state.comment,
    tags: splitTags(state.tags)
  }
  const disabled = !validate(currentFields)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    onClose()
    useIllust.replace(illust.id, bookmark(illust, state.restrict))
    bookmarkBy(illust.id, currentFields).finally(() =>
      useIllust.refresh(illust.id)
    )
  }
  const handleChange = (value: Partial<typeof state>) =>
    setState({ ...state, ...value })

  return (
    <Form onSubmit={handleSubmit}>
      <Dialog.Content>
        <FlexBox>
          <Thumbnail src={illust.urls.thumb} />
          <Box flexGrow={1}>
            <RestrictField value={state.restrict} onChange={handleChange} />
            <CommentField value={state.comment} onChange={handleChange} />
            <Sticky>
              <TagField
                value={state.tags}
                count={currentFields.tags.length}
                onChange={handleChange}
              />
            </Sticky>
            <IllustTagList
              items={illust.tags.tags}
              currentTags={currentFields.tags}
              onChange={handleChange}
            />
            <UserTagList
              items={fields.userTags}
              currentTags={currentFields.tags}
              onChange={handleChange}
            />
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
          <BookmarkOnIcon size={18} mr={2} color="crimson" />
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
const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--surface);
`
