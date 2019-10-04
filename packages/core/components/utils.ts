import { css, get, SystemStyleObject } from '@styled-system/css'
import { DefaultTheme, StyledComponent, StyledProps } from 'styled-components'

type ThemeKeys = keyof DefaultTheme

type VariantOf<T extends ThemeKeys> = keyof DefaultTheme[T]

export interface VariantProps<T extends ThemeKeys> {
  /**
   * Works the same as the [Rebass `variant` props](https://rebassjs.org/variants).
   */
  variant?: VariantOf<T>
}

export interface SxProps {
  /**
   * Works the same as the [Rebass `sx` props](https://rebassjs.org/props#sx-prop).
   */
  sx?: SystemStyleObject
}

export type ComponentSet<
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  P extends object,
  O extends Record<string, React.ComponentType>
> = StyledComponent<T, DefaultTheme, P, never> & O

/**
 * Extends the styled component will able to use `variant` prop.
 * - The `variant` prop works like `variant` prop for [Rebass](https://rebassjs.org/variants).
 *
 * @example
 * ```tsx
 * const Text = styled.p<VariantProps<'text'>>(themeRef('text'))
 * const theme = {
 *   text: {
 *     title: {
 *       fontSize: '2rem',
 *       fontWeight: 500
 *     },
 *     sentence: {
 *       fontSize: '1rem',
 *       fontWeight: 400
 *     }
 *   }
 * }
 * <ThemeProvider theme={theme}>
 *   <Text variant="title">font-size 2rem</Text>
 *   <Text variant="sentence">font-size 1rem</Text>
 * </ThemeProvider>
 * ```
 */
export const themeRef = <T extends ThemeKeys>(tx: T) => (
  props: StyledProps<VariantProps<T>>
) => css({ variant: tx + '.' + props.variant })(props)

/**
 * Extends the styled component will able to use `sx` prop.
 * - The `sx` prop works like `sx` prop for [rebass](https://rebassjs.org/props#sx-prop).
 *
 * @example
 * ```tsx
 * const Box = styled.div<SxProps>(css)
 * <Box sx={{bg: 'primary'}}>Primary color box</Box>
 * ```
 */
export const sx = (props: StyledProps<SxProps>) => css(props.sx)(props)

/**
 * Extends the base style with the specified styles.
 * @example
 * ```ts
 * styled.div(extend({
 *   color: 'primary'
 * }))
 * ```
 */
export const extend = (styles: SystemStyleObject = {}) =>
  css({
    boxSizing: 'border-box',
    m: 0,
    minWidth: 0,
    ...styles
  })

/**
 * Creates a custom style utility to apply complex styles based on a single prop.
 * @example
 * ```tsx
 * type ColourProps = PropsOf<typeof textOverflow>
 * const colour = variant('colour', {
 *   primary: {
 *     bg: 'primary',
 *     color: 'onPrimary'
 *   },
 *   secondary: {
 *     bg: 'secondary',
 *     color: 'onSecondary'
 *   }
 * })
 * const Box = styled.div<ColourProps>(colour)
 * <Box colour="primary" />
 * ```
 */
export const variant = <T extends string, P extends string>(
  prop: T,
  valiants: { [K in P]: SystemStyleObject }
) => (props: StyledProps<Partial<Record<T, P>>>) =>
  css(valiants[props[prop]!])(props)

/**
 * Returns a getter function that retrieves the theme value with the specified key.
 * @example
 * ```tsx
 * <Box sx={{opacity: themeGet('opacities.disabled')}}>Disabled</Box>
 * ```
 */
export const themeGet = (key: string, fallback?: any) => (
  theme: DefaultTheme
) => get(theme, key, fallback)
