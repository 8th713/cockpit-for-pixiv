import { IconButton } from '../../shared/IconButton'
import { RefreshIcon } from '../../shared/Icons'

export interface AuthorRefetchButtonProps {
  isError: boolean
  isFetching: boolean
  refetch: () => any
}

export function AuthorRefetchButton({
  isError,
  isFetching,
  refetch,
}: AuthorRefetchButtonProps) {
  if (!isError) return null

  return (
    <IconButton type="button" loading={isFetching} onClick={() => refetch()}>
      <RefreshIcon />
    </IconButton>
  )
}
