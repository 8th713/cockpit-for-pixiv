import React from 'react'
import { useRouteActions } from '../../Router'
import { Progress } from '../../shared/Progress'
import { StandardView } from './StandardView'

type Props = {
  isError?: boolean
  children?: React.ReactNode
}

export function StandardViewMock({ isError, children }: Props) {
  const { unset, go } = useRouteActions()
  const goFromEvent: React.MouseEventHandler = e => {
    e.stopPropagation()
    go(e.shiftKey ? -1 : 1)
  }

  return (
    <StandardView.Mock>
      <span onClick={unset}>
        <StandardView.Box>
          {!isError && <Progress onClick={goFromEvent} />}
        </StandardView.Box>
      </span>
      {children}
    </StandardView.Mock>
  )
}
