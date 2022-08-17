import { Title } from '../../shared/Box'
import { SkeletonText } from '../../shared/Skeleton'
import { styled } from '../../stitches.config'

export interface IllustTitleProps {
  info?: Pixiv.IllustInfo
  isLoading: boolean
}

export function IllustTitle({ info, isLoading }: IllustTitleProps) {
  return (
    <Title
      css={{
        flexGrow: 1,
        paddingY: '$1',
      }}
    >
      <SkeletonText loaded={!isLoading}>
        {
          <IllustTitleLink href={info && `/artworks/${info.illustId}`}>
            {info?.title || '取得できませんでした'}
          </IllustTitleLink>
        }
      </SkeletonText>
    </Title>
  )
}

const IllustTitleLink = styled('a', {
  baseStyle: true,
  linkStyle: 'inherit',
})
