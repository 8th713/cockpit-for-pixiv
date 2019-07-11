import * as sys from 'styled-system'
import { DefaultTheme } from 'styled-components'
export * from 'styled-system'

export interface EmProps {
  em?: sys.ResponsiveValue<'high' | 'medium' | 'low' | number>
}
export interface EllipsisProps {
  ellipsis?: boolean
}

export const themeGet = (path: string, fallback: any = null) => (props: {
  theme?: DefaultTheme
}) => sys.get(props.theme, path, fallback)

export const omitSystemProps = <P extends { [key: string]: any }>(props: P) => {
  const {
    // SpaceProps
    m,
    margin,
    mt,
    marginTop,
    mr,
    marginRight,
    mb,
    marginBottom,
    ml,
    marginLeft,
    mx,
    marginX,
    my,
    marginY,
    p,
    padding,
    pt,
    paddingTop,
    pr,
    paddingRight,
    pb,
    paddingBottom,
    pl,
    paddingLeft,
    px,
    paddingX,
    py,
    paddingY,
    // ColorProps
    color,
    bg,
    backgroundColor,
    opacity,
    // TypographyProps
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textAlign,
    fontStyle,
    // LayoutProps
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    size,
    display,
    verticalAlign,
    overflow,
    // FlexboxProps
    alignItems,
    alignContent,
    justifyItems,
    justifyContent,
    flexWrap,
    flexDirection,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    justifySelf,
    alignSelf,
    order,
    // GridProps
    gridGap,
    gridRowGap,
    gridColumnGap,
    gridColumn,
    gridRow,
    gridArea,
    gridAutoFlow,
    gridAutoRows,
    gridAutoColumns,
    gridTemplateRows,
    gridTemplateColumns,
    gridTemplateAreas,
    // BackgroundProps
    background,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    // BorderProps
    border,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderX,
    borderY,
    // PositionProps
    position,
    zIndex,
    top,
    right,
    bottom,
    left,
    // ShadowProps
    boxShadow,
    textShadow,
    // Variants
    variant,
    textStyle,
    colors,
    //
    ...rest
  } = props

  return rest
}

export const flexItem = sys.compose(
  sys.alignSelf,
  sys.justifySelf,
  sys.order
)

export const gridItem = sys.compose(
  sys.alignSelf,
  sys.justifySelf,
  sys.gridArea,
  sys.gridColumn,
  sys.gridRow
)

export const em = sys.system({
  em: {
    property: 'opacity',
    defaultScale: {
      high: 'var(--high)',
      medium: 'var(--medium)',
      low: 'var(--low)'
    }
  }
})

export const ellipsis = ({ ellipsis }: EllipsisProps) =>
  ellipsis &&
  ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  } as any)
