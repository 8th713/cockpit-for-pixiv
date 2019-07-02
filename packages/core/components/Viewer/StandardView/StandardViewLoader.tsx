import React from 'react'
import { usePages } from '../PagesHost'
import { ErrorDialog } from './ErrorDialog'
import { StandardView } from './StandardView'
import { StandardViewMock } from './StandardViewMock'

type Props = {
  children?: React.ReactNode
}

export function StandardViewLoader({ children }: Props) {
  const { input: id, read, reload } = usePages()
  const pages = read()

  if (!pages)
    return (
      <StandardViewMock isError>
        <ErrorDialog id={id} onClick={() => reload()} />
        {children}
      </StandardViewMock>
    )

  return (
    <StandardView id={id} pages={pages}>
      {children}
    </StandardView>
  )
}
StandardViewLoader.Mock = StandardViewMock
