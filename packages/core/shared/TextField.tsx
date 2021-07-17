import { Control, RegisterOptions, useFormState } from 'react-hook-form'
import { styled } from '../stitches.config'
import { duration, easing } from './animation'
import { Paragraph } from './Text'
import { typography } from './typography'

export type TextFieldProps = {
  label: string
  name: string
  control: Control<any>
  options?: RegisterOptions
  children?: React.ReactNode
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
  '&::before': {
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
    ...typography.body,
    fontSize: '16px',
    '&:disabled': {
      opacity: 0.38,
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
  '[aria-invalid="true"] &': {
    color: '$secondary',
    opacity: 1,
  },
  defaultVariants: {
    typo: 'caption',
  },
})

function FieldRoot({
  name,
  control,
  children,
}: {
  name: string
  control: Control
  children: React.ReactNode
}) {
  const state = useFormState({ name, control })

  return <Root aria-invalid={!!state.errors[name]}>{children}</Root>
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
    <Container>
      <Input placeholder=" " {...control.register(name, options)} />
      <Label>{label}</Label>
      <Line />
    </Container>
  )
}

export function TextField({
  label,
  name,
  control,
  options,
  children,
}: TextFieldProps) {
  return (
    <FieldRoot name={name} control={control}>
      <FieldInput
        label={label}
        name={name}
        control={control}
        options={options}
      />
      {children}
    </FieldRoot>
  )
}

TextField.Message = Message

if (__DEV__) {
  Root.displayName = 'TextField.Root'
  Container.displayName = 'TextField.InputContainer'
  Input.displayName = 'TextField.Input'
  Label.displayName = 'TextField.Label'
  Line.displayName = 'TextField.Line'
  Message.displayName = 'TextField.Message'
}
