import React, { forwardRef } from 'react'
import { duration, easing, StitchesProps, styled } from '../stitches.config'
import { Flex } from './Box'
import { Paragraph } from './Text'

export type TextFieldProps = StitchesProps<typeof Input> & {
  children?: never
  counter?: string
  invalid?: boolean
  label?: string
  message?: string
  type?: never
}

const Root = styled('div', {
  boxSizing: 'border-box',
  minWidth: 280,
  margin: 0,
  '&[aria-disabled="true"]': {
    opacity: 0.38,
  },
})

const Container = styled('label', {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'block',
  minWidth: 0,
  height: 56,
  margin: 0,
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
  '::before': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    position: 'absolute',
    cover: 0,
    zIndex: 0,
    borderRadius: 'inherit',
    backgroundColor: '#fff',
    opacity: 0.12,
  },
  '&:focus-within::before': {
    opacity: 0.24,
  },
})

const Input = styled('input', {
  '&&&': {
    appearance: 'none',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 1,
    width: '100%',
    minWidth: 0,
    height: '100%',
    outlineWidth: 0,
    margin: 0,
    paddingX: 12,
    paddingTop: 20,
    paddingBottom: '6px',
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: 'inherit',
    caretColor: '$primary',
    text: '$body',
    fontSize: '16px',
    ':disabled': {
      opacity: 0.38,
    },
    '::placeholder': {
      opacity: 0,
    },
    ':focus::placeholder': {
      color: 'inherit',
      opacity: 0.6,
    },
  },
})

const Label = styled('div', {
  pointerEvents: 'none',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 16,
  left: 12,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  opacity: 0.6,
  transformOrigin: '0 0',
  transitionProperty: 'color, opacity, transform',
  transitionDuration: duration.simple,
  transitionTimingFunction: easing.standard,
  'input:focus~&, input:not(:placeholder-shown)~&': {
    transform: 'scale(0.75) translateY(-14px)',
  },
  '[aria-invalid="true"] input:focus~& , [aria-invalid="true"] input:not(:placeholder-shown)~&': {
    color: '$secondary',
    opacity: 1,
  },
  'input:focus~&': {
    color: '$primary',
    opacity: 1,
  },
})

const Line = styled('div', {
  pointerEvents: 'none',
  boxSizing: 'border-box',
  position: 'absolute',
  overflow: 'hidden',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 2,
  '[aria-disabled="true"] &': {
    height: 0,
  },
  '::before': {
    content: '""',
    boxSizing: 'inherit',
    display: 'block',
    width: '100%',
    height: 1,
    marginTop: '1px',
    backgroundColor: '$onSurface',
    opacity: 0.6,
  },
  '::after': {
    content: '""',
    boxSizing: 'inherit',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'block',
    width: '100%',
    height: 2,
    backgroundColor: '$primary',
    transform: 'scaleX(0)',
    transitionProperty: 'transform',
    transitionDuration: duration.simple,
    transitionTimingFunction: easing.standard,
  },
  '[aria-invalid="true"] &::after': {
    backgroundColor: '$secondary',
    transform: 'scaleX(1)',
  },
  'input:focus~&::after': {
    transform: 'scaleX(1)',
  },
})

const Message = styled(Paragraph, {
  marginBottom: 0,
  opacity: 0.6,
  text: '$caption',
  '[aria-invalid="true"] &': {
    color: '$secondary',
    opacity: 1,
  },
})

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ css, counter, disabled, invalid, label, message, ...props }, ref) => {
    const hasHelper = counter || message

    return (
      <Root css={css} aria-invalid={invalid} aria-disabled={disabled}>
        <Container>
          <Input
            placeholder=" "
            {...props}
            disabled={disabled}
            type="text"
            ref={ref}
          />
          <Label>{label}</Label>
          <Line />
        </Container>
        {hasHelper && (
          <Flex css={{ columnGap: '$2', paddingX: 12 }}>
            <Message css={{ flexGrow: 1, ellipsis: 'auto' }}>{message}</Message>
            <Message css={{ flexShrink: 0 }}>{counter}</Message>
          </Flex>
        )}
      </Root>
    )
  }
)

if (__DEV__) {
  Root.displayName = 'TextField.Root'
  Container.displayName = 'TextField.InputContainer'
  Input.displayName = 'TextField.Input'
  Label.displayName = 'TextField.Label'
  Line.displayName = 'TextField.Line'
  Message.displayName = 'TextField.Message'
}
