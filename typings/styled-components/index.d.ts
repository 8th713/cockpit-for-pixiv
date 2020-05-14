import { SystemStyleObject } from '@styled-system/css'
import * as CSS from 'csstype'
import 'styled-components'

declare module 'styled-components' {
  type VariantRecord<T extends string = string> = Record<T, SystemStyleObject>

  type FontVars = 'sans' | 'mono'
  type ColorsVars =
    | 'bg'
    | 'surface'
    | 'onSurface'
    | 'primary'
    | 'onPrimary'
    | 'secondary'
    | 'onSecondary'
  type OpacitiesVars = 'hover' | 'focus' | 'divider' | 'inactive' | 'disabled'
  type TextVars = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption' | 'button'

  export interface DefaultTheme {
    breakpoints: string[]
    // system
    fonts: Record<FontVars, CSS.FontFamilyProperty>
    fontSizes: Record<TextVars, CSS.FontSizeProperty<string>>
    colors: Record<ColorsVars, CSS.ColorProperty>
    shadows: string[]
    // variants
    opacities: Record<OpacitiesVars, CSS.GlobalsNumber>
    text: VariantRecord<TextVars>
  }
}
