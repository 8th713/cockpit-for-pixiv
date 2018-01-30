import * as React from 'react'
import { observer } from 'mobx-react'
import { Status } from '../../types'

interface Props {
  data: {
    status: Status
  }
  onFetching: () => React.ReactNode
  onResolved: () => React.ReactNode
  onRejected: () => React.ReactNode
}

export const Loadable: React.SFC<Props> = observer((props: Props) => {
  switch (props.data.status) {
    case Status.IDLING:
    case Status.FETCHING: {
      return props.onFetching() as any
    }
    case Status.RESOLVED: {
      return props.onResolved() as any
    }
    case Status.REJECTED: {
      return props.onRejected() as any
    }
  }
})
