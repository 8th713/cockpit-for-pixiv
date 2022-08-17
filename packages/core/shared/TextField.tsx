import React from 'react'
import { Control, RegisterOptions, useFormState } from 'react-hook-form'
import { styled } from '../stitches.config'

export interface TextFieldProps {
  label: string
  name: string
  control: Control<any>
  options?: RegisterOptions
  children?: React.ReactNode
}

export function TextField({
  label,
  name,
  control,
  options,
  children,
}: TextFieldProps) {
  return (
    <FieldContainer name={name} control={control}>
      <FieldInput
        label={label}
        name={name}
        control={control}
        options={options}
      />
      {children}
    </FieldContainer>
  )
}

export const FieldMessage = styled('p', {
  baseStyle: true,
  textStyle: '$caption',
  opacity: 0.6,
  '[aria-invalid="true"] &': {
    color: '$secondary',
    opacity: 1,
  },
})

function FieldContainer({
  name,
  control,
  children,
}: {
  name: string
  control: Control
  children: React.ReactNode
}) {
  const state = useFormState({ name, control })
  const invalid = !!state.errors[name]

  return (
    <StyledFieldContainer aria-invalid={invalid}>
      {children}
    </StyledFieldContainer>
  )
}

function FieldInput({
  label,
  name,
  control,
  options,
}: {
  label: string
  name: string
  control: Control
  options?: RegisterOptions
}) {
  return (
    <StyledFieldInput>
      <StyledInput placeholder=" " {...control.register(name, options)} />
      <StyledLabel>{label}</StyledLabel>
      <StyledLine />
    </StyledFieldInput>
  )
}

const StyledFieldContainer = styled('div', {
  boxSizing: 'border-box',
  minWidth: 280,
  margin: 0,
  '&[aria-disabled="true"]': {
    opacity: '$disabled',
  },
})

const StyledFieldInput = styled('label', {
  baseStyle: true,
  position: 'relative',
  display: 'block',
  height: '$md',
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
  '&::before': {
    content: '""',
    pointerEvents: 'none',
    boxSizing: 'inherit',
    cover: 0,
    zIndex: 0,
    borderRadius: 'inherit',
    backgroundColor: '#fff',
    opacity: '$hover',
  },
  '&:focus-within::before': {
    opacity: '$focus',
  },
})

const StyledInput = styled('input', {
  '&&&': {
    appearance: 'none',
    baseStyle: true,
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    paddingX: 12,
    paddingTop: 20,
    paddingBottom: '6px',
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: 'inherit',
    caretColor: '$primary',
    textStyle: '$body',
    fontSize: '16px',
    outline: 0,
    '&:disabled': {
      opacity: '$disabled',
    },
    '&::placeholder': {
      opacity: 0,
    },
    '&:focus::placeholder': {
      color: 'inherit',
      opacity: 0.6,
    },
  },
})

const StyledLabel = styled('div', {
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
  transitions: 'color, opacity, transform',
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

const StyledLine = styled('div', {
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
  '&::before': {
    content: '""',
    boxSizing: 'inherit',
    display: 'block',
    width: '100%',
    height: 1,
    marginTop: '1px',
    backgroundColor: '$onSurface',
    opacity: 0.6,
  },
  '&::after': {
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
    transitions: 'transform',
  },
  '[aria-invalid="true"] &::after': {
    backgroundColor: '$secondary',
    transform: 'scaleX(1)',
  },
  'input:focus~&::after': {
    transform: 'scaleX(1)',
  },
})
