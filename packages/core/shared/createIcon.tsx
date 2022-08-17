import { styled } from '../stitches.config'

export type IconComponent = ReturnType<typeof createIcon>

export const SvgIcon = styled('svg', {
  baseStyle: true,
  fill: 'currentColor',
  variants: {
    size: {
      sm: { size: 18 },
      md: { size: 24 },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export function createIcon(path: JSX.Element, displayName: string) {
  function Icon(props: React.ComponentPropsWithoutRef<typeof SvgIcon>) {
    return (
      <SvgIcon
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
    )
  }

  Icon.displayName = `${displayName}Icon`
  return Icon
}
