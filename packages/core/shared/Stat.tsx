import { styled } from '../stitches.config'
import { IconProps } from './createIcon'
import { typography } from './typography'

export const Root = styled('div', {
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: '$1',
  whiteSpace: 'nowrap',
  ...typography.body,
})

export type StatProps = {
  /** A count length or upload date. */
  value: number | string
  /** A prefix icon. */
  icon: React.ComponentType<IconProps>
  /** An advisory information text */
  title?: string
}

export type TextWithIconProps = {
  children: React.ReactNode
  icon: React.ComponentType<IconProps>
  title?: string
}

export const Stat = ({ value, icon: Icon, title }: StatProps) => (
  <Root title={title}>
    <Icon size="sm" />
    {format(value)}
  </Root>
)

const format = (value: number | string) => {
  if (typeof value === 'number') {
    return value.toLocaleString()
  }
  return new Date(value).toLocaleString()
}

export const TextWithIcon = ({
  children,
  icon: Icon,
  title,
}: TextWithIconProps) => (
  <Root title={title}>
    <Icon size="sm" />
    {children}
  </Root>
)

if (__DEV__) {
  Root.displayName = 'Stat.Root'
}
