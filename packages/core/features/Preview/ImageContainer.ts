import { styled } from '../../stitches.config'

export const ImageContainer = styled('div', {
  pointerEvents: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - $sizes$md)',
  padding: '$5',
})
