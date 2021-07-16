import { useEffect } from 'react'
import { Box, Flex } from '../../../shared/Box'
import { Button } from '../../../shared/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../../shared/Dialog'
import { Divider } from '../../../shared/Divider'
import { BookmarkOnIcon, RefreshIcon } from '../../../shared/Icon'
import { Img } from '../../../shared/Img'
import { Switch } from '../../../shared/Switch'
import { Title } from '../../../shared/Text'
import { TextField } from '../../../shared/TextField'
import { useBookmarkQuery } from './bookmarkQuery'
import { CommentCount } from './CommentCount'
import { IllustTagList } from './IllustTagList'
import { TagsCount } from './TagsCount'
import { UserTagList } from './UserTagList'
import { splitTags, useBookmarkForm } from './utils'

export interface BookmarkProps extends Pixiv.Illust {
  onSubmit: (data: Pixiv.BookmarkPost) => void
}

const COMMENT_MAX = 140
const TAGS_MAX = 10

const validateTags = (value: string) =>
  splitTags(value).length <= TAGS_MAX || 'タグが多すぎます'

export const Bookmark = ({
  id,
  title,
  urls,
  tags: { tags: illustTags },
  onSubmit,
}: BookmarkProps) => {
  const { data, isLoading, isError, refetch } = useBookmarkQuery(id)
  const form = useBookmarkForm()
  const { control, register, reset, setValue } = form
  const handleSubmit = form.handleSubmit((values) => {
    const tags = splitTags(values.tags)

    onSubmit({ ...values, tags })
  })

  useEffect(() => {
    if (data) {
      const { userTags, ...fields } = data

      reset(fields)
    }
  }, [data, reset])

  return (
    <form
      action="dialog"
      style={{ display: 'contents' }}
      onSubmit={handleSubmit}
    >
      <Dialog css={{ width: 960 }}>
        <DialogHeader>
          <Title>{title}</Title>
        </DialogHeader>
        <Divider css={{ marginX: 24 }} />
        <DialogContent>
          <Flex css={{ columnGap: '$3' }}>
            <Box css={{ flexShrink: 0 }}>
              <Img
                src={urls.thumb}
                width="240"
                height="240"
                css={{ position: 'sticky', top: 0 }}
              />
            </Box>
            <Flex
              css={{
                flexDirection: 'column',
                flexGrow: 1,
                rowGap: '$3',
              }}
            >
              <Switch {...register('restrict')}>非公開</Switch>
              <TextField
                label="ブックマークコメント"
                name="comment"
                control={control}
                options={{
                  maxLength: {
                    value: COMMENT_MAX,
                    message: '文字数が多すぎます',
                  },
                }}
              >
                <CommentCount
                  name="comment"
                  control={control}
                  maxLength={COMMENT_MAX}
                />
              </TextField>
              <TextField
                label="ブックマークタグ"
                name="tags"
                control={control}
                options={{ validate: validateTags }}
              >
                <TagsCount name="tags" control={control} maxLength={TAGS_MAX} />
              </TextField>
              <IllustTagList
                control={control}
                setValue={setValue}
                items={illustTags}
              />
              <UserTagList
                control={control}
                setValue={setValue}
                items={data ? data.userTags : []}
              />
            </Flex>
          </Flex>
        </DialogContent>
        <Divider css={{ marginX: 24 }} />
        <DialogFooter>
          {isError && (
            <Button type="button" onClick={() => refetch()}>
              <RefreshIcon />
              再取得
            </Button>
          )}
          <Button type="submit" disabled={isLoading || isError}>
            <BookmarkOnIcon css={{ color: 'crimson' }} />
            ブックマーク
          </Button>
        </DialogFooter>
      </Dialog>
    </form>
  )
}
