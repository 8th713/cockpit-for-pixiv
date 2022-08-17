import { Button } from '../../shared/Button'
import { DialogBody, DialogContent, DialogFooter } from '../../shared/Dialog'
import { RefreshIcon } from '../../shared/Icons'
import { styled } from '../../stitches.config'
import type { ImagesQuery } from '../Preview/imagesQuery'
import type { MovieQuery } from '../Video/movieQuery'

interface ErrorDialogProps {
  query: ImagesQuery | MovieQuery
}

export function ErrorDialog({ query }: ErrorDialogProps) {
  return (
    <DialogContent onClick={(e) => e.stopPropagation()}>
      <DialogBody>
        <Paragraph>リクエストに失敗しました</Paragraph>
      </DialogBody>
      <DialogFooter>
        <Button disabled={query.isFetching} onClick={() => query.refetch()}>
          <RefreshIcon />
          再取得
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

const Paragraph = styled('p', {
  baseStyle: true,
  textStyle: '$h3',
  marginBottom: '$1',
})
