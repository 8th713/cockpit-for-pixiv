import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  BookmarkOnIcon,
  Box,
  Button,
  Dialog,
  Divider,
  Flex,
  Heading,
  Img,
  Paragraph,
  Progress,
  RefreshIcon,
  Switch,
  Text,
  TextField
} from '../../components'
import { fetchBookmarkForm } from '../../externals/apiClient'
import { createCache } from '../../hooks/useCache'
import { bookmark, bookmarkBy, useIllust } from '../Illust'
import { IllustTagList, UserTagList } from './TagList'

interface Props extends Pixiv.Illust {
  onSubmit: () => void
}

interface SuccessProps extends Props {
  fields: Pixiv.BookmarkForm
}

const COMMENT_MAX = 140
const TAGS_MAX = 10

const useBookmarkForm = createCache(fetchBookmarkForm, 1)

export const BookmarkDialog = (props: Props) => (
  <Dialog sx={{ width: 960 }}>
    <React.Suspense fallback={<Loading {...props} />}>
      <Loader {...props} />
    </React.Suspense>
  </Dialog>
)

const Loader = (props: Props) => {
  const fields = useBookmarkForm(props.id)

  if (!fields) return <Failure {...props} />
  return <Success {...props} fields={fields} />
}

const Loading = ({ title, urls }: Props) => (
  <Form>
    <Dialog.Header>
      <Heading>{title}</Heading>
    </Dialog.Header>
    <Divider sx={{ mx: 24 }} />
    <Dialog.Content>
      <Flex>
        <Box sx={{ flexShrink: 0, mr: 3 }}>
          <Img
            src={urls.thumb}
            width="240"
            height="240"
            sx={{ position: 'sticky', top: 0 }}
          />
        </Box>
        <Flex sx={{ flexGrow: 1 }}>
          <Progress />
        </Flex>
      </Flex>
    </Dialog.Content>
  </Form>
)

const Failure = ({ id, title, urls }: Props) => (
  <Form
    onSubmit={e => {
      e.preventDefault()
      useBookmarkForm.remove(id)
    }}
  >
    <Dialog.Header>
      <Heading>{title}</Heading>
    </Dialog.Header>
    <Divider sx={{ mx: 24 }} />
    <Dialog.Content>
      <Flex>
        <Box sx={{ flexShrink: 0, mr: 3 }}>
          <Img
            src={urls.thumb}
            width="240"
            height="240"
            sx={{ position: 'sticky', top: 0 }}
          />
        </Box>
        <Flex sx={{ flexGrow: 1 }}>
          <Paragraph sx={{ m: 'auto' }}>取得に失敗しました</Paragraph>
        </Flex>
      </Flex>
    </Dialog.Content>
    <Divider sx={{ mx: 24 }} />
    <Dialog.Footer>
      <Button type="submit">
        <RefreshIcon sx={{ size: 18, mr: 2 }} />
        再取得
      </Button>
    </Dialog.Footer>
  </Form>
)

const Success = ({ fields, onSubmit, ...illust }: SuccessProps) => {
  const { getPostData, tagList, onChange, ...form } = useForm(fields)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    onSubmit()
    useIllust.replace(illust.id, bookmark(illust, form.restrict))
    bookmarkBy(illust.id, getPostData()).finally(() =>
      useIllust.refresh(illust.id)
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Dialog.Header>
        <Heading>{illust.title}</Heading>
      </Dialog.Header>
      <Divider sx={{ mx: 24 }} />
      <Dialog.Content>
        <Flex>
          <Box sx={{ flexShrink: 0, mr: 3 }}>
            <Img
              src={illust.urls.thumb}
              width="240"
              height="240"
              sx={{ position: 'sticky', top: 0 }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Flex sx={{ alignItems: 'center', ml: 3 }}>
              <Text variant="body2" sx={{ mr: 2 }}>
                非公開
              </Text>
              <Switch
                name="restrict"
                aria-label="非公開"
                checked={form.restrict}
                onChange={e => onChange({ restrict: e.target.checked })}
              />
            </Flex>
            <TextField
              sx={{ mt: 3, mb: 2 }}
              name="comment"
              maxLength={COMMENT_MAX}
              value={form.comment}
              onChange={e => onChange({ comment: e.target.value })}
              label="ブックマークコメント"
              counter={`${form.comment.length}/${COMMENT_MAX}`}
            />
            <TextField
              sx={{
                position: 'sticky',
                top: -16,
                zIndex: 1,
                mt: 3,
                mb: 2,
                bg: 'surface'
              }}
              name="tags"
              maxLength={TAGS_MAX}
              value={form.tags}
              onChange={e => onChange({ tags: e.target.value })}
              label="ブックマークタグ"
              message="スペース区切りで10個まで登録できます。英数字等は半角に統一されます。"
              counter={`${tagList.length}/${TAGS_MAX}`}
              invalid={tagList.length > TAGS_MAX}
            />
            <IllustTagList
              items={illust.tags.tags}
              current={tagList}
              onChange={onChange}
            />
            <UserTagList
              items={fields.userTags}
              current={tagList}
              onChange={onChange}
            />
          </Box>
        </Flex>
      </Dialog.Content>
      <Divider sx={{ mx: 24 }} />
      <Dialog.Footer>
        <Button type="submit" disabled={form.disabled}>
          <BookmarkOnIcon
            sx={{
              size: 18,
              mr: 2,
              color: 'crimson'
            }}
          />
          ブックマーク
        </Button>
      </Dialog.Footer>
    </Form>
  )
}

const Form = styled.form({
  display: 'contents'
})

const useForm = ({ userTags, ...fields }: Pixiv.BookmarkForm) => {
  const [state, setState] = useState(fields)
  const tagList = useMemo(() => {
    return state.tags
      .trim()
      .split(/[\s\xA0　]+/)
      .filter(t => t.length)
  }, [state.tags])
  const getPostData = (): Required<Pixiv.BookmarkPost> => ({
    ...state,
    tags: tagList
  })
  const disabled = !validate(state.comment, tagList)
  const onChange = (value: Partial<typeof state>) =>
    setState({ ...state, ...value })
  return { ...state, tagList, disabled, getPostData, onChange }
}

const validate = (comment: string, tags: string[]) => {
  if (comment.length > COMMENT_MAX) return false
  if (tags.length > TAGS_MAX) return false
  return true
}

if (__DEV__) {
  Loader.displayName = 'BookmarkDialog.Loader'
  Loading.displayName = 'BookmarkDialog.Loading'
  Failure.displayName = 'BookmarkDialog.Failure'
  Success.displayName = 'BookmarkDialog.Success'
  Form.displayName = 'BookmarkDialog.Form'
}
