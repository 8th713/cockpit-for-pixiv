import React from 'react'
import { FullSizeMode } from './FullSizeMode'
import { FullSizeView } from './FullSizeView'
import { ScrollSpy } from './ScrollSpy'
import { StandardView } from './StandardView'

type Props = {
  id: string
  children?: React.ReactNode
}

export function Viewer({ id, children }: Props) {
  return (
    <FullSizeMode>
      <ScrollSpy id={id}>
        <StandardView id={id}>{children}</StandardView>
        <FullSizeView id={id} />
      </ScrollSpy>
    </FullSizeMode>
  )
}
