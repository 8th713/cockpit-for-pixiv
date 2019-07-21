import React from 'react'
import { FullSizeMode } from './FullSizeMode'
import { FullSizeView } from './FullSizeView'
import { ScrollSpy } from './ScrollSpy'
import { StandardView } from './StandardView'
import { Info } from '../Info'

type Props = {
  id: string
}

export function Viewer({ id }: Props) {
  return (
    <FullSizeMode>
      <ScrollSpy id={id}>
        <StandardView id={id}>
          <Info />
        </StandardView>
        <FullSizeView id={id} />
      </ScrollSpy>
    </FullSizeMode>
  )
}
