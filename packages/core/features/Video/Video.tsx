import { ErrorDialog } from '../ErrorDialog/ErrorDialog'
import { useStickyMovieQuery } from './movieQuery'
import { Player } from './Player'

interface VideoProps {
  illustId: string
  fullscreenMode?: boolean
  children?: React.ReactNode
}

export function Video({ illustId, fullscreenMode, children }: VideoProps) {
  const query = useStickyMovieQuery(illustId)

  return query.isError ? (
    <ErrorDialog query={query} />
  ) : !query.frames ? (
    <>{children}</>
  ) : (
    <Player
      key={illustId}
      fullscreenMode={fullscreenMode}
      frames={query.frames}
    />
  )
}
