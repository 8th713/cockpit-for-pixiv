import css from '@styled-system/css'
import React, { forwardRef } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { Flex } from './Box'
import { Paragraph } from './Text'
import { createTransition } from './transitions'
import { extend, sx, SxProps, themeGet } from './utils'

type NativeInput = React.ComponentPropsWithoutRef<'input'>

export interface TextFieldProps extends NativeInput, SxProps {
  children?: never
  counter?: string
  invalid?: boolean
  label?: string
  message?: string
  type?: never
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      counter,
      disabled,
      invalid,
      label,
      message,
      style,
      sx,
      ...props
    },
    ref
  ) => {
    const hasHelper = counter || message
    return (
      <Root
        className={className}
        style={style}
        sx={sx}
        aria-invalid={invalid}
        aria-disabled={disabled}
      >
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
          <Flex sx={{ px: 12 }}>
            <Message textOverflow="ellipsis" sx={{ mr: 'auto' }}>
              {message}
            </Message>
            <Message sx={{ flexShrink: 0, ml: 3 }}>{counter}</Message>
          </Flex>
        )}
      </Root>
    )
  }
)

const Root = styled.div<SxProps>(
  extend({
    minWidth: 280,
    '&[aria-disabled="true"]': {
      opacity: themeGet('opacities.disabled'),
    },
  }),
  sx
)

const Container = styled.label(
  extend({
    position: 'relative',
    display: 'block',
    height: 56,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    '::before': {
      content: '""',
      pointerEvents: 'none',
      boxSizing: 'inherit',
      position: 'absolute',
      zIndex: 0,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      bg: '#fff',
      opacity: themeGet('opacities.divider'),
    },
    '&:focus-within::before': {
      opacity: 0.24,
    },
  })
)

const Input = styled.input(
  extend({
    WebkitAppearance: 'none',
    outlineWidth: 0,
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    m: 0,
    px: 12,
    pt: 20,
    pb: '6px',
    borderWidth: 0,
    bg: 'transparent',
    color: 'inherit',
    caretColor: ({ colors }: DefaultTheme) => colors.primary,
    variant: 'text.body1',
    ':disabled': {
      opacity: themeGet('opacities.disabled'),
    },
    '::placeholder': {
      opacity: 0,
    },
    '&:focus::placeholder': {
      color: 'inherit',
      opacity: themeGet('opacities.inactive'),
    },
  } as any)
)

const Label = styled.div(
  extend({
    pointerEvents: 'none',
    position: 'absolute',
    top: 16,
    left: 12,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    opacity: themeGet('opacities.inactive'),
    transformOrigin: '0 0',
    transition: createTransition(['color', 'opacity', 'transform']),
    'input:focus~&, input:not(:placeholder-shown)~&': {
      transform: 'scale(0.75) translateY(-14px)',
    },
    '[aria-invalid="true"] input:focus~& , [aria-invalid="true"] input:not(:placeholder-shown)~&': {
      color: 'secondary',
      opacity: 1,
    },
    'input:focus~&': {
      color: 'primary',
      opacity: 1,
    },
  })
)

const Line = styled.div(
  extend({
    pointerEvents: 'none',
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
      mt: '1px',
      bg: 'onSurface',
      opacity: themeGet('opacities.inactive'),
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
      bg: 'primary',
      transform: 'scaleX(0)',
      transition: createTransition('transform'),
    },
    '[aria-invalid="true"] &::after': {
      bg: 'secondary',
      transform: 'scaleX(1)',
    },
    'input:focus~&::after': {
      transform: 'scaleX(1)',
    },
  })
)

const Message = styled(Paragraph)(
  css({
    mb: 0,
    opacity: themeGet('opacities.inactive'),
    '[aria-invalid="true"] &': {
      color: 'secondary',
      opacity: 1,
    },
  })
)
Message.defaultProps = {
  variant: 'caption',
}

if (__DEV__) {
  TextField.displayName = 'TextField'
  Root.displayName = 'TextField.Root'
  Container.displayName = 'TextField.Container'
  Input.displayName = 'TextField.Input'
  Label.displayName = 'TextField.Label'
  Line.displayName = 'TextField.Line'
  Message.displayName = 'TextField.Message'
}
