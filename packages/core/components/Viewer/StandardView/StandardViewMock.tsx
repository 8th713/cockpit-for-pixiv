import React from 'react'
import { useRouteActions } from '../../Router'
import { useServices } from '../../Services'
import { Progress } from '../../shared/Progress'
import { ErrorDialog } from './ErrorDialog'
import { StandardView } from './StandardView'

type Props = {
  id?: string
  children?: React.ReactNode
}

export function StandardViewMock({ id, children }: Props) {
  const { unset, go } = useRouteActions()
  const { apiClient } = useServices()
  const { remove } = apiClient.usePages()
  const goFromEvent: React.MouseEventHandler = e => {
    e.stopPropagation()
    go(e.shiftKey ? -1 : 1)
  }

  return (
    <StandardView.Mock>
      <span onClick={unset}>
        <StandardView.Box>
          {!id && <Progress onClick={goFromEvent} />}
          {id && <ErrorDialog id={id} onClick={() => remove(id)} />}
        </StandardView.Box>
      </span>
      {children}
    </StandardView.Mock>
  )
}
