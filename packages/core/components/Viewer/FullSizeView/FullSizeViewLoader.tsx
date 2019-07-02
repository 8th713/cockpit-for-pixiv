import React from 'react'
import { FullSizeMode } from '../FullSizeMode'
import { usePages } from '../PagesHost'
import { FullSizeView } from './FullSizeView'

export function FullSizeViewLoader() {
  const { input: id, read } = usePages()
  const pages = read()

  if (!pages) return null

  return (
    <FullSizeMode.On>
      <FullSizeView id={id} pages={pages} />
    </FullSizeMode.On>
  )
}
