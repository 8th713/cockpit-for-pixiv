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
import { useBookmarkQuery } from './bookmarkQuery'
import { CommentField } from './CommentField'
import { IllustTagList } from './IllustTagList'
import { TagsField } from './TagsField'
import { UserTagList } from './UserTagList'
import { splitTags, useBookmarkForm } from './utils'

export interface BookmarkProps extends Pixiv.Illust {
  onSubmit: (data: Pixiv.BookmarkPost) => void
}

export const Bookmark = ({
  id,
  title,
  urls,
  tags: { tags: illustTags },
  onSubmit,
}: BookmarkProps) => {
  const { data, isLoading, isError, refetch } = useBookmarkQuery(id)
  const form = useBookmarkForm()
  const { reset } = form
  const handleSubmit = form.handleSubmit((values) => {
    const tags = splitTags(values.tags)

    onSubmit({ ...values, tags })
  })

  useEffect(() => {
    if (data) reset(data)
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
              <Switch ref={form.register} name="restrict">
                非公開
              </Switch>
              <CommentField
                control={form.control}
                register={form.register}
                errors={form.errors}
              />
              <TagsField
                control={form.control}
                register={form.register}
                errors={form.errors}
              />
              <IllustTagList
                control={form.control}
                setValue={form.setValue}
                items={illustTags}
              />
              <UserTagList
                control={form.control}
                setValue={form.setValue}
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
