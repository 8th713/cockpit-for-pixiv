import React from 'react'
import styled from 'styled-components'
import { PaddingProvider } from '../../contexts'
import { Slider } from '../shared/Slider'
import { Text } from '../shared/Text'

export function PaddingEditor() {
  const padding = PaddingProvider.usePaddingValue()
  const setPadding = PaddingProvider.usePaddingAction()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPadding(event.target.valueAsNumber)
  }

  return (
    <Field>
      <Text v="s1">Padding</Text>
      <Text v="overline" c="textSecondary">
        {padding}px
      </Text>
      <FieldSlider>
        <Slider min={16} max={256} value={padding} onChange={handleChange} />
      </FieldSlider>
    </Field>
  )
}

const Field = styled.label`
  all: unset;
  display: grid;
  grid-template-areas: 'label value' 'slider slider';
  align-items: center;
  justify-content: space-between;
  min-width: 512px;
  padding: 16px 0;
`
const FieldSlider = styled.div`
  all: unset;
  grid-area: slider;
  display: block;
`
