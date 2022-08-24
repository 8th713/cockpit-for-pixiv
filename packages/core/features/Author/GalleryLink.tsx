import { IconButton, IconLink } from '../../shared/IconButton'
import { ArtworksIcon } from '../../shared/Icons'

export interface GalleryLinkProps {
  userId?: string
}

export function GalleryLink({ userId }: GalleryLinkProps) {
  if (userId) {
    return (
      <IconLink href={`/users/${userId}/artworks`} title="作品一覧">
        <ArtworksIcon />
      </IconLink>
    )
  }
  return (
    <IconButton type="button" disabled title="作品一覧">
      <ArtworksIcon />
    </IconButton>
  )
}
