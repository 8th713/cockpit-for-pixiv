import { Divider } from '../../shared/Divider'
import { styled } from '../../stitches.config'
import { Author } from '../Author/Author'
import { RecentWorks } from '../RecentWorks/RecentWorks'
import { AboutButton } from './AboutButton'
import { BookmarkButton } from './BookmarkButton'
import { Description } from './Description'
import { DownloadButton } from './DownloadButton'
import { IllustTitle } from './IllustTitle'
import { useStickyInfo } from './infoQuery'
import { InfoRefetchButton } from './InfoRefetchButton'
import { LikeButton } from './LikeButton'
import { ScrollBottomButton } from './ScrollBottomButton'
import { ShareButton } from './ShareButton'
import { Stats } from './Stats'
import { TagList } from './TagList'

export interface InfoProps {
  illustId: string
}

export function Info({ illustId }: InfoProps) {
  const { info, isError, isFetching, isLoading, refetch } = useStickyInfo(
    illustId
  )

  return (
    <>
      <Caption>
        <CaptionButtonGroup>
          <ScrollBottomButton />
        </CaptionButtonGroup>
        <IllustTitle info={info} isLoading={isLoading} />
        <CaptionButtonGroup>
          <InfoRefetchButton
            isError={isError}
            isFetching={isFetching}
            refetch={refetch}
          />
          <LikeButton info={info} />
          <BookmarkButton info={info} />
          <DownloadButton info={info} />
          <ShareButton info={info} />
          <AboutButton />
        </CaptionButtonGroup>
      </Caption>
      <Details>
        <StickyDivider />
        <TwoColumns>
          <LeftPane>
            <Description info={info} />
            <TagList info={info} />
            <Stats info={info} />
          </LeftPane>
          <Divider />
          <RightPane>
            <Author illustId={illustId} />
          </RightPane>
        </TwoColumns>
        <Divider css={{ marginX: '$3' }} />
        <RecentWorks illustId={illustId} />
      </Details>
    </>
  )
}

const Caption = styled('div', {
  baseStyle: true,
  position: 'sticky',
  top: 0,
  bottom: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  columnGap: '$3',
  backgroundColor: '$surface',
  color: '$onSurface',
})

const CaptionButtonGroup = styled('div', {
  baseStyle: true,
  padding: '$1',
  whiteSpace: 'nowrap',
})

const Details = styled('div', {
  baseStyle: true,
  backgroundColor: '$surface',
  color: '$onSurface',
  textStyle: '$body',
})

const StickyDivider = styled(Divider, {
  position: 'sticky',
  top: '$sizes$md',
  marginX: '$3',
})

const TwoColumns = styled('div', {
  baseStyle: true,
  display: 'flex',
  padding: '$3',
  columnGap: '$2',
})

const LeftPane = styled('div', {
  baseStyle: true,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  rowGap: '$3',
})

const RightPane = styled('div', {
  baseStyle: true,
  position: 'sticky',
  top: 72,
  width: 256,
  alignSelf: 'start',
  flexShrink: 0,
})
