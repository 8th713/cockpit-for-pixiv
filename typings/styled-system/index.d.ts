import { DefaultTheme } from 'styled-components'
import 'styled-system'

declare module 'styled-system' {
  export declare function get<T>(obj: any, key: string, def: T): T

  export interface ColorProps extends OpacityProps {}
  export interface LayoutProps extends OverflowProps {}
  export interface FlexItemProps
    extends AlignSelfProps,
      JustifySelfProps,
      OrderProps {}
  export interface GridItemProps
    extends AlignSelfProps,
      JustifySelfProps,
      GridAreaProps,
      GridColumnProps,
      GridRowProps {}

  export type ValueOf<O, P> = P extends keyof O ? O[P] : never
  export type StrictResponsiveValue<T> = T extends never
    ? never
    : ResponsiveValue<keyof T>

  export interface STextStyleProps<T = DefaultTheme> {
    textStyle?: StrictResponsiveValue<ValueOf<T, 'textStyles'>>
  }

  export interface SButtonStyleProps<T = DefaultTheme> {
    variant?: StrictResponsiveValue<ValueOf<T, 'buttons'>>
  }

  export interface SColorStyleProps<T = DefaultTheme> {
    colors?: StrictResponsiveValue<ValueOf<T, 'colorStyles'>>
  }

  export interface SystemProps
    extends SpaceProps,
      ColorProps,
      TypographyProps,
      LayoutProps,
      FlexboxProps,
      GridProps,
      BackgroundProps,
      BorderProps,
      PositionProps,
      ShadowProps,
      ButtonStyleProps,
      TextStyleProps,
      ColorStyleProps {}
}
