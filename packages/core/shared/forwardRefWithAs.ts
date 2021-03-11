/**
 * @license MIT
 * @copyright https://github.com/radix-ui/primitives
 */

type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2

type MergeProps<E, P = {}> = P &
  Merge<E extends React.ElementType ? React.ComponentPropsWithRef<E> : never, P>

/**
 * Infers the OwnProps if E is a ForwardRefExoticComponentWithAs
 */
type OwnProps<E> = E extends ForwardRefComponent<any, infer P> ? P : {}

/**
 * Infers the JSX.IntrinsicElement if E is a ForwardRefExoticComponentWithAs
 */
type IntrinsicElement<E> = E extends ForwardRefComponent<infer I, any>
  ? I
  : never

type NarrowIntrinsic<E> = E extends keyof JSX.IntrinsicElements ? E : never

/* -------------------------------------------------------------------------------------------------
 * ForwardRefComponent
 * -----------------------------------------------------------------------------------------------*/

interface ForwardRefComponent<
  IntrinsicElementString,
  OwnProps = {}
  /**
   * Extends original type to ensure built in React types play nice
   * with polymorphic components still e.g. `React.ElementRef` etc.
   */
>
  extends React.ForwardRefExoticComponent<
    MergeProps<
      IntrinsicElementString,
      OwnProps & { as?: IntrinsicElementString }
    >
  > {
  /**
   * When passing an `as` prop as a string, use this overload.
   * Merges original own props (without DOM props) and the inferred props
   * from `as` element with the own props taking precendence.
   *
   * We explicitly define a `JSX.IntrinsicElements` overload so that
   * events are typed for consumers.
   */
  <
    As extends keyof JSX.IntrinsicElements = NarrowIntrinsic<
      IntrinsicElementString
    >
  >(
    props: MergeProps<As, OwnProps & { as: As }>
  ): React.ReactElement | null

  /**
   * When passing an `as` prop as a component, use this overload.
   * Merges original own props (without DOM props) and the inferred props
   * from `as` element with the own props taking precendence.
   *
   * We don't use `React.ComponentType` here as we get type errors
   * when consumers try to do inline `as` components.
   */
  <As extends React.ElementType>(
    props: MergeProps<As, OwnProps & { as: As }>
  ): React.ReactElement | null
}

export type { ForwardRefComponent, OwnProps, IntrinsicElement, Merge }
