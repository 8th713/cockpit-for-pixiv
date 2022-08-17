import { CSS, keyframes, styled } from '../stitches.config'

export interface SkeletonProps {
  width?: CSS['width']
  height?: CSS['height']
  children?: React.ReactNode
  loaded?: boolean
}

export interface SkeletonCircleProps {
  size?: CSS['size']
  children?: React.ReactNode
  loaded?: boolean
}

export interface SkeletonTextProps {
  textStyle?: CSS['textStyle']
  lines?: number
  children?: React.ReactNode
  loaded?: boolean
}

export function Skeleton({
  width = 'inherit',
  height = '1.2em',
  loaded,
  children,
}: SkeletonProps) {
  if (loaded) return <>{children}</>

  return <SkeletonContainer css={{ width, height }} />
}

export function SkeletonCircle({
  size = 40,
  loaded,
  children,
}: SkeletonCircleProps) {
  if (loaded) return <>{children}</>

  return <SkeletonContainer variant="circle" css={{ size }} />
}

export function SkeletonText({
  lines = 1,
  textStyle = '$body',
  loaded,
  children,
}: SkeletonTextProps) {
  if (loaded) return <>{children}</>

  const numbers = Array(lines).fill(null)

  return (
    <div>
      {numbers.map((_, idx) => (
        <SkeletonContainer
          key={idx}
          variant="text"
          css={{ minWidth: 64, width: '$full', flexGrow: 1, textStyle }}
        />
      ))}
    </div>
  )
}

const waveAnimetion = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '60%': {
    transform: 'translateX(100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
}).toString()

const SkeletonContainer = styled('div', {
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  backgroundColor: 'rgba(255,255,255,0.12)',
  '&::after': {
    content: '""',
    cover: 0,
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`,
    transform: 'translateX(-100%)',
    animationName: waveAnimetion,
    animationDuration: '1.6s',
    animationTimingFunction: 'linear',
    animationDelay: '0.5s',
    animationIterationCount: 'infinite',
  },
  variants: {
    variant: {
      circle: {
        borderRadius: '50%',
      },
      text: {
        transform: 'scale(1, 0.6)',
        transformOrigin: '0px 55%',
        '&::before': {
          content: '"\\00a0"',
          visibility: 'hidden',
        },
      },
    },
  },
})
