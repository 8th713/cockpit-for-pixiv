import { HTMLText } from '../../shared/HTMLText'
import { SkeletonText } from '../../shared/Skeleton'

export interface DescriptionProps {
  info?: Pixiv.IllustInfo
}

export function Description({ info }: DescriptionProps) {
  return (
    <SkeletonText lines={3} loaded={!!info}>
      {info ? <HTMLText>{info.description}</HTMLText> : null}
    </SkeletonText>
  )
}
