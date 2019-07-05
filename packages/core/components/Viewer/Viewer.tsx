import React from 'react'
import { FullSizeMode } from './FullSizeMode'
import { FullSizeView } from './FullSizeView'
import { ScrollSpy } from './ScrollSpy'
import { StandardView, StandardViewMock } from './StandardView'
import { useServices } from '../Services'

type Props = {
  id: string
  children?: React.ReactNode
}

export function Viewer({ id, children }: Props) {
  return (
    <FullSizeMode>
      <ScrollSpy id={id}>
        <React.Suspense
          fallback={<StandardViewMock>{children}</StandardViewMock>}
        >
          <PageLoader id={id}>{children}</PageLoader>
          <FullSizePageLoader id={id} />
        </React.Suspense>
      </ScrollSpy>
    </FullSizeMode>
  )
}

function PageLoader({ id, children }: Props) {
  const { apiClient } = useServices()
  const pages = apiClient.usePages(id)

  if (!pages) return <StandardViewMock id={id}>{children}</StandardViewMock>
  return <StandardView pages={pages}>{children}</StandardView>
}

function FullSizePageLoader({ id }: Props) {
  const { apiClient } = useServices()
  const pages = apiClient.usePages(id)

  if (!pages) return null
  return (
    <FullSizeMode.On>
      <FullSizeView id={id} pages={pages} />
    </FullSizeMode.On>
  )
}
