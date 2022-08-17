import { IconButton } from '../../shared/IconButton'
import { RefreshIcon } from '../../shared/Icons'

export interface InfoRefetchButtonProps {
  isError: boolean
  isFetching: boolean
  refetch: () => any
}

export function InfoRefetchButton({
  isError,
  isFetching,
  refetch,
}: InfoRefetchButtonProps) {
  if (!isError) return null

  return (
    <IconButton type="button" loading={isFetching} onClick={() => refetch()}>
      <RefreshIcon />
    </IconButton>
  )
}
