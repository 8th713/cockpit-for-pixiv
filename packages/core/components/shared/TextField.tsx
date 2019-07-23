import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
import * as sys from '../system'
import { Box } from './Box'

interface BoxProps
  extends sys.PositionProps,
    sys.WidthProps,
    sys.MarginProps,
    sys.FlexItemProps,
    sys.GridItemProps {}
type InputProps = React.ComponentPropsWithoutRef<'input'>
export type TextFieldProps = BoxProps &
  InputProps & {
    as?: never
    invalid?: boolean
    label?: string
    helperText?: string
    counterText?: string
  }

const Impl = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const otherProps = sys.omitSystemProps(props)
    const {
      className,
      style,
      invalid,
      label,
      helperText,
      counterText,
      ...inputProps
    } = otherProps
    const hasHelper = !!helperText || !!counterText
    const input = useRef<HTMLInputElement>(null)
    const [isLeft, leave] = useState(false)
    useImperativeHandle(ref, () => input.current!)
    useLayoutEffect(() => {
      const node = input.current
      if (!node) return
      const handleInput = () => {
        leave(!!node.value)
      }
      node.addEventListener('change', handleInput)
      return () => {
        node.removeEventListener('change', handleInput)
      }
    }, [])
    useLayoutEffect(() => {
      const node = input.current
      if (!node) return
      if (node === document.activeElement) return
      leave(!!node.value)
    }, [inputProps.value, inputProps.defaultValue])

    return (
      <div className={className} style={style} data-invalid={invalid}>
        <Field>
          <Input ref={input} aria-invalid={invalid} {...inputProps} />
          <Outline>
            <Leading />
            <Notch data-left={isLeft}>
              <Label>{label}</Label>
            </Notch>
            <Trailing />
          </Outline>
        </Field>
        {hasHelper && (
          <Helper>
            <Box>{helperText}</Box>
            <Box ml={3}>{counterText}</Box>
          </Helper>
        )}
      </div>
    )
  }
)
if (process.env.NODE_ENV !== 'production') {
  Impl.displayName = 'TextField'
}

export const TextField = styled(Impl)`
  box-sizing: border-box;
  min-width: 280px;
  ${sys.compose(
    sys.position,
    sys.width,
    sys.margin,
    sys.flexbox,
    sys.grid
  )}
`
const Field = styled.label`
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  height: 56px;
`
const Input = styled.input`
  &&& {
    box-sizing: border-box;
    display: flex;
    align-self: flex-end;
    width: 100%;
    height: 100%;
    padding: 12px 16px 14px;
    border: 0;
    background-color: transparent;
    color: var(--on-surface);
    caret-color: var(--primary);
    font-family: inherit;
    ${sys.themeGet('textStyles.b1')};
    line-height: 1.75;
    transition: opacity 100ms linear;
    &::placeholder {
      color: var(--on-surface);
      opacity: 0;
    }
    &:focus {
      outline: none;
      &::placeholder {
        opacity: var(--medium);
      }
    }
    &:disabled {
      opacity: var(--disabled);
    }
  }
`
const Outline = styled.div`
  box-sizing: border-box;
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  pointer-events: none;
`
const Leading = styled.div`
  box-sizing: border-box;
  width: 12px;
  height: 100%;
  border-top: 2px solid;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-radius: 4px 0 0 4px;
  border-color: rgba(255, 255, 255, var(--divider));
  transition: border-color 100ms linear;
  input:hover + div > & {
    border-color: var(--on-surface);
  }
  input:focus + div > & {
    border-color: var(--primary);
  }
  input[aria-invalid='true'] + div > & {
    border-color: var(--error);
  }
  input:disabled + div > & {
    border-color: rgba(255, 255, 255, var(--hovered));
  }
`
const Trailing = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  height: 100%;
  border-top: 2px solid;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-radius: 0 4px 4px 0;
  border-color: rgba(255, 255, 255, var(--divider));
  transition: border-color 100ms linear;
  input:hover + div > & {
    border-color: var(--on-surface);
  }
  input:focus + div > & {
    border-color: var(--primary);
  }
  input[aria-invalid='true'] + div > & {
    border-color: var(--error);
  }
  input:disabled + div > & {
    border-color: rgba(255, 255, 255, var(--hovered));
  }
`
const Notch = styled.div`
  box-sizing: border-box;
  flex: 0 0 auto;
  width: auto;
  height: 100%;
  border-top: 2px solid;
  border-bottom: 2px solid;
  border-color: rgba(255, 255, 255, var(--divider));
  transition: border-color 100ms linear;
  input:hover + div > & {
    border-color: var(--on-surface);
  }
  input:focus + div > & {
    border-color: var(--primary);
  }
  input[aria-invalid='true'] + div > & {
    border-color: var(--error);
  }
  input:disabled + div > & {
    border-color: rgba(255, 255, 255, var(--hovered));
  }
  input:focus + div > &,
  &[data-left='true'] {
    border-top-width: 0;
  }
`
const Label = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  top: 12px;
  max-width: 100%;
  margin: 0 4px;
  opacity: var(--medium);
  font: inherit;
  line-height: 1.75;
  letter-spacing: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: top 150ms cubic-bezier(0.4, 0, 0.2, 1),
    font-size 150ms cubic-bezier(0.4, 0, 0.2, 1),
    line-height 150ms cubic-bezier(0.4, 0, 0.2, 1), color 100ms linear,
    opacity 100ms linear;
  will-change: top font-size line-height color opacity;
  input:required + div > div > &::after {
    content: '*';
  }
  input:hover + div > div > & {
    opacity: 1;
  }
  input:focus + div > div > & {
    color: var(--primary);
    opacity: 1;
  }
  input[aria-invalid='true'] + div > div > & {
    color: var(--error);
    opacity: 1;
  }
  input:disabled + div > div > & {
    display: none;
  }
  input:focus + div > div > &,
  [data-left='true'] > & {
    top: -8px;
    font-size: 12px;
    line-height: 1.5;
  }
`
const Helper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 16px -2px;
  color: var(--on-surface);
  opacity: var(--medium);
  ${sys.themeGet('textStyles.caption')};
  line-height: 1;
  white-space: nowrap;
  [data-invalid='true'] > & {
    color: var(--error);
    opacity: 1;
  }
`
