import { styled } from '../stitches.config'
import { IconComponent } from './createIcon'

export interface TextWithIconProps {
  title?: string
  icon: IconComponent
  children?: React.ReactNode
}

export function TextWithIcon({
  title,
  icon: Icon,
  children,
}: TextWithIconProps) {
  return (
    <TextWithIconContainer title={title}>
      <Icon size="sm" />
      {children}
    </TextWithIconContainer>
  )
}

const TextWithIconContainer = styled('div', {
  baseStyle: true,
  display: 'inline-flex',
  gap: '$1',
  whiteSpace: 'nowrap',
})
