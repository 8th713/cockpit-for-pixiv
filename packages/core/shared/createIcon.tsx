import { forwardRef, memo } from 'react'
import { styled, StitchesProps } from '../stitches.config'

export type IconProps = Omit<StitchesProps<typeof SvgIcon>, 'children'>

export const SvgIcon = styled('svg', {
  boxSizing: 'border-box',
  minWidth: 0,
  margin: 0,
  fill: 'currentColor',
  variants: {
    size: {
      sm: {
        size: 18,
      },
      md: {
        size: 24,
      },
    },
  },
})

export const createIcon = (path: JSX.Element, displayName: string) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <SvgIcon
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      aria-label={displayName}
      {...props}
    >
      {path}
    </SvgIcon>
  ))
  const Component = memo(Icon)

  if (__DEV__) {
    Icon.displayName = `${displayName}Icon`
    Component.displayName = `memo(${displayName}Icon)`
  }
  return Component
}

if (__DEV__) {
  SvgIcon.displayName = 'SvgIcon'
}
