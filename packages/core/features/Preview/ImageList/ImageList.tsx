import { Box } from '../../../shared/Box'
import { Button } from '../../../shared/Button'
import { Dialog, DialogContent, DialogFooter } from '../../../shared/Dialog'
import { RefreshIcon } from '../../../shared/Icon'
import { Progress } from '../../../shared/Progress'
import { Paragraph } from '../../../shared/Text'
import { styled } from '../../../stitches.config'
import { useNavigate } from '../../Router/routerState'
import { usePagesQuery } from '../pagesQuery'
import { PreviewControl } from '../PreviewControl/PreviewControl'
import { useWatch } from '../previewState'
import { ImageListItem } from './ImageListItem'

export interface ImageListProps {
  id: string
}

export function ImageList({ id }: ImageListProps) {
  const { data, isLoading, isError, isFetching, refetch } = usePagesQuery(id)
  const { unset } = useNavigate()
  const watch = useWatch()

  return (
    <Box css={{ position: 'relative' }}>
      {isLoading && (
        <ImageContainer onClick={unset}>
          <Progress />
        </ImageContainer>
      )}
      {isError && (
        <ImageContainer onClick={unset}>
          <Dialog>
            <DialogContent>
              <Paragraph>リクエストに失敗しました</Paragraph>
              <Paragraph>illustId: {id}</Paragraph>
            </DialogContent>
            <DialogFooter>
              <Button disabled={isFetching} onClick={() => refetch()}>
                <RefreshIcon />
                再取得
              </Button>
            </DialogFooter>
          </Dialog>
        </ImageContainer>
      )}
      {data &&
        data.map((image) => (
          <ImageContainer key={image.urls.original} ref={watch} onClick={unset}>
            <ImageListItem {...image} id={id} />
          </ImageContainer>
        ))}
      <PreviewControl />
    </Box>
  )
}

export const ImageContainer = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 56px)',
  padding: '$4',
})

if (__DEV__) {
  ImageContainer.displayName = 'ImageList.Item'
}
