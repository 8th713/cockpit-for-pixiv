import { variant } from './utils'

type PropsOf<T extends (arg: any) => any> = Omit<Parameters<T>[0], 'theme'>

export type TextOverflowProps = PropsOf<typeof textOverflow>

export const textOverflow = variant('textOverflow', {
  clip: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip'
  },
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
})
