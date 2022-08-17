import { styled } from '../stitches.config'
import { SkeletonCircle } from './Skeleton'

export interface AvatarProps {
  src?: string
  size?: keyof typeof SIZE
}

const SIZE = {
  sm: 40,
  lg: 128,
} as const

export function Avatar({ src, size = 'sm' }: AvatarProps) {
  const sizeValue = SIZE[size]

  return (
    <SkeletonCircle size={sizeValue} loaded={!!src}>
      <AvatarImage
        loading="lazy"
        width={sizeValue}
        height={sizeValue}
        size={size}
        src={src}
      />
    </SkeletonCircle>
  )
}

const AvatarImage = styled('img', {
  objectFit: 'contain',
  boxSizing: 'border-box',
  flexShrink: 0,
  margin: 0,
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.32)',
  variants: {
    size: {
      sm: {
        size: 40,
      },
      lg: {
        size: 128,
      },
    },
  },
})
