import React from 'react'
import styled from 'styled-components'
import * as styles from './styles'

type Props = React.ComponentPropsWithoutRef<'input'> & {
  margin?: boolean
  invalid?: boolean
  label?: string
  helperText?: string
  counterText?: string
}

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {
      className,
      margin,
      invalid,
      label,
      helperText,
      counterText,
      ...inputProps
    } = props
    const hasHelper = !!helperText || !!counterText

    return (
      <Root className={className} data-invalid={invalid} data-margin={margin}>
        <Field>
          <Input ref={ref} aria-invalid={invalid} {...inputProps} />
          <Outline>
            <Leading />
            <Notch>
              <Label>{label}</Label>
            </Notch>
            <Trailing />
          </Outline>
        </Field>
        {hasHelper && (
          <Helper>
            <HelperText>{helperText}</HelperText>
            <Counter>{counterText}</Counter>
          </Helper>
        )}
      </Root>
    )
  }
)

const Root = styled.div`
  flex-shrink: 0;
  min-width: 280px;
  &[data-margin='true'] {
    margin-top: 16px;
    margin-bottom: 8px;
  }
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
  border-top: 0;
  border-bottom: 2px solid;
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
const Label = styled.div`
  display: inline-block;
  position: relative;
  top: -8px;
  max-width: 100%;
  margin: 0 4px;
  opacity: var(--medium);
  font: inherit;
  font-size: 12px;
  line-height: 1.15rem;
  letter-spacing: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
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
`
const Helper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 16px -2px;
  color: var(--on-surface);
  opacity: var(--medium);
  ${styles.fontPresets.caption};
  line-height: 1;
  white-space: nowrap;
  [data-invalid='true'] > & {
    color: var(--error);
    opacity: 1;
  }
`
const HelperText = styled.p`
  margin: 0;
`
const Counter = styled.span`
  padding-left: 16px;
`
