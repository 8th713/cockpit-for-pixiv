import { Box } from '../../../shared/Box'
import { styled } from '../../../stitches.config'

export const Cover = styled(Box, {
  pointerEvents: 'none',
  cover: 0,
})

if (__DEV__) {
  Cover.displayName = 'PreviewControl.Cover'
}
