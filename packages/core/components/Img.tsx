import styled from 'styled-components'
import { extend, sx, SxProps } from './utils'

export interface ImgProps extends SxProps {}

export const Img = styled.img<ImgProps>(extend(), sx)

if (__DEV__) {
  Img.displayName = 'Img'
}
