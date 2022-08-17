import { styled } from '../stitches.config'

export interface KbdProps {
  children: string
}

export function Kbd({ children }: KbdProps) {
  return (
    <KbdContainer>
      {children
        .split('+')
        .flatMap((key, idx) => [
          <KbdPunctuation key={idx}>+</KbdPunctuation>,
          <KbdKbd key={key}>{key}</KbdKbd>,
        ])
        .slice(1)}
    </KbdContainer>
  )
}

const KbdContainer = styled('span', {
  fontFamily: '$mono',
  fontSize: '$caption',
  whiteSpace: 'nowrap',
})

const KbdPunctuation = styled('span', {
  boxSizing: 'border-box',
  marginX: '$2',
  opacity: 0.6,
})

const KbdKbd = styled('kbd', {
  boxSizing: 'border-box',
  margin: 0,
  paddingX: '$2',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$primary',
  borderRadius: 4,
  textAlign: 'center',
  textTransform: 'capitalize',
})
