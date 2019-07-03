import React from 'react'
import { FullSizeMode } from './FullSizeMode'
import { FullSizeView } from './FullSizeView'
import { PagesHost, usePages } from './PagesHost'
import { ScrollSpy } from './ScrollSpy'
import { StandardView, StandardViewMock } from './StandardView'

type Props = {
  id: string
  children?: React.ReactNode
}

export function Viewer({ id, children }: Props) {
  return (
    <FullSizeMode>
      <ScrollSpy id={id}>
        <PagesHost id={id}>
          <React.Suspense
            fallback={<StandardViewMock>{children}</StandardViewMock>}
          >
            <PageLoader id={id}>{children}</PageLoader>
            <FullSizePageLoader />
          </React.Suspense>
        </PagesHost>
      </ScrollSpy>
    </FullSizeMode>
  )
}

function PageLoader({ id, children }: Props) {
  const { read } = usePages()
  const pages = read()

  if (!pages) return <StandardViewMock id={id}>{children}</StandardViewMock>
  return <StandardView pages={pages}>{children}</StandardView>
}

function FullSizePageLoader() {
  const { input: id, read } = usePages()
  const pages = read()

  if (!pages) return null
  return (
    <FullSizeMode.On>
      <FullSizeView id={id} pages={pages} />
    </FullSizeMode.On>
  )
}
