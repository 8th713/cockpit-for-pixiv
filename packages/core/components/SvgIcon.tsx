import React, { forwardRef, memo } from 'react'
import styled from 'styled-components'
import { extend, sx, SxProps } from './utils'

export interface SvgIconProps extends SxProps {}

export type IconProps = Omit<
  React.ComponentPropsWithoutRef<typeof SvgIcon>,
  'children'
>

export const SvgIcon = styled.svg<SvgIconProps>(
  extend({
    fill: 'currentColor'
  }),
  sx
)
SvgIcon.defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24'
}

export const createIcon = (path: JSX.Element, displayName: string) => {
  const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <SvgIcon ref={ref} focusable="false" aria-label={displayName} {...props}>
      {path}
    </SvgIcon>
  ))
  const Component = memo(Icon)

  if (__DEV__) {
    Component.displayName = `${displayName}Icon`
  }
  return Component
}

if (__DEV__) {
  SvgIcon.displayName = 'SvgIcon'
}
