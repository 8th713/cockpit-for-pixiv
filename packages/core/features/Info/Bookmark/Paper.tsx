import { Flex } from '../../../shared/Box'
import { styled } from '../../../stitches.config'

export const Paper = styled(Flex, {
  position: 'relative',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  padding: '$1',
  gap: '$1',
  '&::after': {
    content: '""',
    pointerEvents: 'none',
    cover: 0,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
})
