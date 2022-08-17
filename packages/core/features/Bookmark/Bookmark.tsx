import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Title } from '../../shared/Box'
import { Button } from '../../shared/Button'
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../shared/Dialog'
import { Divider } from '../../shared/Divider'
import { BookmarkOnIcon, RefreshIcon } from '../../shared/Icons'
import { Switch } from '../../shared/Switch'
import { styled } from '../../stitches.config'
import { useBookmarkQuery } from './bookmarkQuery'
import { CommentField } from './CommentField'
import { IllustTagList } from './IllustTagList'
import { splitTags } from './splitTags'
import { TagsField } from './TagsField'
import { UserTagList } from './UserTagList'

export interface BookmarkProps {
  info: Pixiv.IllustInfo
  onSubmit: (body: Pixiv.BookmarkPost) => void
}

export function Bookmark({ info, onSubmit }: BookmarkProps) {
  const { bookmarkState, isFetching, isError, refetch } = useBookmarkQuery(
    info.illustId
  )

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
  } = useForm<Pixiv.BookmarkState>({
    shouldUseNativeValidation: true,
    defaultValues: {
      restrict: false,
      comment: '',
      tags: '',
    },
  })

  useEffect(() => {
    if (bookmarkState) {
      const { userTags, ...fields } = bookmarkState

      reset(fields)
    }
  }, [bookmarkState, reset])

  return (
    <form
      action="dialog"
      style={{ display: 'contents' }}
      onSubmit={handleSubmit((state) => {
        onSubmit({
          ...state,
          tags: splitTags(state.tags),
        })
      })}
    >
      <DialogContent css={{ width: 960 }}>
        <DialogHeader>
          <Title>{info.title}</Title>
        </DialogHeader>
        <Divider css={{ marginX: '$4' }} />
        <DialogBody>
          <Box flex css={{ columnGap: '$3' }}>
            <ThumbnailContainer>
              <Thumbnail src={info.urls.thumb} />
            </ThumbnailContainer>
            <FieldGroup>
              <Switch {...register('restrict')}>非公開</Switch>
              <CommentField control={control} />
              <TagsField control={control} />
              <IllustTagList
                control={control}
                setValue={setValue}
                tagList={info.tags.tags}
              />
              <UserTagList
                control={control}
                setValue={setValue}
                tagList={bookmarkState?.userTags || []}
              />
            </FieldGroup>
          </Box>
        </DialogBody>
        <Divider css={{ marginX: '$4' }} />
        <DialogFooter>
          {isError && (
            <Button type="button" onClick={() => refetch()} variant="secondary">
              <RefreshIcon />
              再取得
            </Button>
          )}
          <Button
            type="submit"
            loading={isFetching}
            disabled={isError}
            variant="primary"
          >
            <BookmarkOnIcon css={{ color: 'crimson' }} />
            ブックマーク
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  )
}

const Thumbnail = styled('img', {
  display: 'block',
  size: 240,
})

const ThumbnailContainer = styled('div', {
  baseStyle: true,
  alignSelf: 'flex-start',
  position: 'sticky',
  top: 0,
  flexShrink: 0,
})

const FieldGroup = styled('div', {
  baseStyle: true,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  rowGap: '$3',
})
