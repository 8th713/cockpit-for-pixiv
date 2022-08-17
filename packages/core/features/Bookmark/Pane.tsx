import { Box, Subtitle } from '../../shared/Box'
import { styled } from '../../stitches.config'

export const Pane = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$2',
})

export const PaneHeader = styled(Box, {
  baseStyle: true,
  display: 'flex',
  alignItems: 'center',
})

export const PaneTitle = styled(Subtitle, {
  flexGrow: 1,
  fontSize: '$body',
})

export const PaneBody = styled(Box, {
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  padding: '$2',
  gap: '$1',
  borderRadius: 4,
  backgroundColor: 'rgba(255,255,255,0.12)',
})
