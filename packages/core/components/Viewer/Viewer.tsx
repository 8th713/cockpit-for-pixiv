import React from 'react'
import { FullSizeViewLoader } from './FullSizeView'
import { StandardViewLoader } from './StandardView'
import { PagesHost } from './PagesHost'
import { Info } from '../Info'
import { ScrollSpy } from './ScrollSpy'
import { FullSizeMode } from './FullSizeMode'

type Props = {
  id: string
}

export function Viewer({ id }: Props) {
  const children = <Info id={id} />
  return (
    <FullSizeMode>
      <ScrollSpy id={id}>
        <PagesHost id={id}>
          <React.Suspense
            fallback={
              <StandardViewLoader.Mock>{children}</StandardViewLoader.Mock>
            }
          >
            <StandardViewLoader>{children}</StandardViewLoader>
            <FullSizeViewLoader />
          </React.Suspense>
        </PagesHost>
      </ScrollSpy>
    </FullSizeMode>
  )
}
