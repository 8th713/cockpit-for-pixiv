import { Box } from '../../../shared/Box'
import { Img } from '../../../shared/Img'
import { useSetIsFullSize } from '../previewState'
import { FullSizeUgoira } from './FullSizeUgoira'

export interface FullSizeItemProps extends Pixiv.Page {
  id: string
}

export function FullSizeItem(props: FullSizeItemProps) {
  const { off } = useSetIsFullSize()
  const isUgoira = props.urls.original.includes('ugoira0')

  return (
    <Box
      css={{
        cursor: 'zoom-out',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        minWidth: '100%',
        minHeight: '100%',
        padding: '$4',
      }}
      onClick={off}
    >
      {isUgoira ? (
        <FullSizeUgoira key={props.urls.original} {...props} />
      ) : (
        <Img
          src={props.urls.original}
          width={props.width}
          height={props.height}
          css={{
            display: 'block',
            maxWidth: 'initial',
            margin: 'auto',
          }}
        />
      )}
    </Box>
  )
}
