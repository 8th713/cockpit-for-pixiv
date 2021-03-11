import { styled } from '../stitches.config'

export type ImgProps = React.ComponentProps<typeof Img>

export const Img = styled('img', {
  boxSizing: 'border-box',
  maxWidth: '100%',
  minWidth: 0,
  height: 'auto',
  margin: 0,
  backgroundColor: 'rgba(255,255,255,0.32)',
})

if (__DEV__) {
  Img.displayName = 'Img'
}
