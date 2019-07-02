import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'

type Props = React.ComponentPropsWithoutRef<'input'> & {
  invalid?: boolean
  children?: React.ReactNode
}

const TextField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, children, invalid, ...rest } = props
  const input = useRef<HTMLInputElement>(null)
  const [isLeft, leave] = useState(false)
  useImperativeHandle(ref, () => input.current!)
  useLayoutEffect(() => {
    const node = input.current
    if (!node) return
    const handleFocus = () => leave(true)
    const handleBlur = () => leave(!!node.value)
    node.addEventListener('focus', handleFocus)
    node.addEventListener('blur', handleBlur)
    leave(!!node.value)
    return () => {
      node.removeEventListener('focus', handleFocus)
      node.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <Box className={className}>
      <Input ref={input} aria-invalid={invalid} {...rest} />
      <Outline>
        <Leading />
        <Notch data-left={isLeft}>
          <Label>{children}</Label>
        </Notch>
        <Trailing />
      </Outline>
    </Box>
  )
})

const Box = styled.label`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
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
    font: inherit;
    line-height: 1.75;
    letter-spacing: inherit;
    transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    &::placeholder {
      color: var(--on-surface);
      opacity: var(--medium);
    }
    &:focus {
      outline: none;
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
  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
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
  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
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
  transition: border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  input:hover + div > & {
    border-color: var(--on-surface);
  }
  &[data-left='true'] {
    border-top: 0;
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
const Label = styled.div`
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
  transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  input:hover + div > div > & {
    opacity: 1;
  }
  [data-left='true'] > & {
    top: -8px;
    font-size: 12px;
    line-height: 1.15rem;
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
`
const HelperLine = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  padding: 0 16px;
`
const HelperText = styled.div`
  color: var(--on-surface);
  opacity: var(--medium);
  white-space: nowrap;
  font-size: 0.75rem;
  line-height: normal;
  font-weight: 400;
  letter-spacing: 0.0333333333em;
`
const Counter = styled(HelperText)`
  justify-self: flex-end;
  padding-left: 16px;
  &[data-invalid='true'] {
    color: var(--error);
    opacity: 1;
  }
`

const Component = Object.assign(TextField, { HelperLine, HelperText, Counter })

export { Component as TextField }
