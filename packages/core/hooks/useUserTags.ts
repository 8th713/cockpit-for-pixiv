import React from 'react'
import { useClient } from '.'
import { success, failure } from './utils'
import { Result, Tag, AsyncStatus } from '../interfaces'

const defaultState: Result<Tag[]> = {
  status: AsyncStatus.Loading,
  value: null
}

export function useUserTags() {
  const { client, ac } = useClient()
  const [result, set] = React.useState<Result<Tag[]>>(defaultState)
  const actions = React.useMemo(() => {
    function read() {
      client.accountTags.read(ac).then(
        value => set(success(value)),
        error => {
          client.accountTags.remove(ac)
          if (error.name === 'AbortError') return

          set(failure(error))
        }
      )
    }

    function reload() {
      client.accountTags.remove(ac)
      read()
    }

    function retry() {
      set(defaultState)
      reload()
    }

    return { read, reload, retry }
  }, [])

  React.useEffect(() => {
    actions.read()
  }, [])

  return { result, actions }
}
