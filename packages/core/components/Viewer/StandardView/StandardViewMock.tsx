import React from 'react'
import { useRouteActions } from '../../Router'
import { Progress } from '../../shared/Progress'
import { StandardView } from './StandardView'
import { ErrorDialog } from './ErrorDialog'
import { usePages } from '../PagesHost'

type Props = {
  id?: string
  children?: React.ReactNode
}

export function StandardViewMock({ id, children }: Props) {
  const { unset, go } = useRouteActions()
  const { reload } = usePages()
  const goFromEvent: React.MouseEventHandler = e => {
    e.stopPropagation()
    go(e.shiftKey ? -1 : 1)
  }

  return (
    <StandardView.Mock>
      <span onClick={unset}>
        <StandardView.Box>
          {!id && <Progress onClick={goFromEvent} />}
          {id && <ErrorDialog id={id} onClick={reload} />}
        </StandardView.Box>
      </span>
      {children}
    </StandardView.Mock>
  )
}
