import React, { useContext } from 'react'
import styled from 'styled-components'
import { PaddingProvider } from '../../contexts'
import { Text } from '../shared/Text'
import { Slider } from '../shared/Slider'

export function PaddingEditor() {
  const value = useContext(PaddingProvider.ValueContext)
  const update = useContext(PaddingProvider.ActionContext)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    update(event.target.valueAsNumber)
  }

  return (
    <Field>
      <Text v="s1">Padding</Text>
      <Text v="overline" c="textSecondary">
        {value}px
      </Text>
      <FieldSlider>
        <Slider min={16} max={256} value={value} onChange={handleChange} />
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
