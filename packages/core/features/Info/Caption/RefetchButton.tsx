import React from 'react'
import { RefreshIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import type { IllustQueryResult } from '../illustQuery'

export type RefetchButtonProps = IllustQueryResult & {
  id: string
}

export const RefetchButton = ({
  isError,
  isFetching,
  refetch,
}: RefetchButtonProps) =>
  isError ? (
    <IconButton
      type="button"
      title="再取得"
      disabled={isFetching}
      onClick={() => refetch()}
    >
      <RefreshIcon />
    </IconButton>
  ) : null
