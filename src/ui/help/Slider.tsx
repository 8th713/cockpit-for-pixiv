import * as React from 'react'
import styled from 'styled-components'
import { colors, light, typography } from '../shared/variables'

interface Attrs extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number
  min: number
  max: number
}

interface Props extends Attrs {
  label: React.ReactNode
  icon: React.ReactNode
}

export const Slider: React.SFC<Props> = ({ icon, label, ...props }) => {
  const progress = props.value / (props.max - props.min) * 100

  return (
    <Root>
      {icon}
      <div>
        <Label>{label}</Label>
        <Content>
          <Range {...props} />
          <Track>
            <TrackActiove style={{ width: `${progress}%` }} />
            <Thumb style={{ left: `${progress}%` }} />
          </Track>
        </Content>
      </div>
      <Value>{props.value}</Value>
    </Root>
  )
}

const Root = styled.label`
  box-sizing: border-box;
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  min-height: 72px;
  margin: 0;
  padding: 12px 16px;
  color: ${light.action.active};
  transition: background-color 255ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus-within {
    background-color: ${light.action.hover};
  }
`

const Label = styled.div`
  color: ${light.text.primary};
  ${typography.subhead};
`

const Value = styled.span`
  justify-self: flex-end;
  color: ${light.text.primary};
`

const Content = styled.div`
  position: relative;
  display: grid;
  height: 24px;
  margin: 0 -5px;
`

const Range = styled.input.attrs({ type: 'range' })`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
`

const Track = styled.div`
  position: relative;
  height: 2px;
  margin: 11px 5px;
  background-color: rgba(0, 0, 0, 0.12);
`

const TrackActiove = styled.div`
  height: 100%;
  background-color: ${colors.primary};
`

const Thumb = styled.div`
  position: absolute;
  top: -5px;
  width: 12px;
  height: 12px;
  margin: 0 -6px;
  border-radius: 50%;
  background-color: ${colors.primary};
  transition: transform 0.2s;

  ${Range}:focus ~ div > & {
    transform: scale(1.7, 1.7);
  }
`
