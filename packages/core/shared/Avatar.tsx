import { AccountIcon } from './Icon'
import { Img } from './Img'

export type AvatarProps = {
  src?: string
  size?: number
}

export function Avatar({ src, size = 40 }: AvatarProps) {
  return src ? (
    <Img
      loading="lazy"
      src={src}
      width={size}
      height={size}
      css={{
        flexShrink: 0,
        borderRadius: '50%',
        objectFit: 'contain',
      }}
    />
  ) : (
    <AccountIcon
      width={size}
      height={size}
      css={{
        flexShrink: 0,
        backgroundColor: '#fff',
        color: '$surface',
        borderRadius: '50%',
      }}
    />
  )
}
