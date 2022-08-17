import { IconComponent } from '../../shared/createIcon'
import { IconLink } from '../../shared/IconButton'

export interface SocialLinkProps {
  href?: string | null
  title: string
  icon: IconComponent
}

export function SocialLink({ href, title, icon: Icon }: SocialLinkProps) {
  return href ? (
    <IconLink target="_blank" rel="noopener referer" href={href} title={title}>
      <Icon />
    </IconLink>
  ) : null
}
