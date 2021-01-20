import React from 'react'
import { Box, Flex, Skeleton } from '../../../shared/Box'
import {
  BookmarkOnIcon,
  DateTimeIcon,
  LikeIcon,
  ViewCountIcon,
} from '../../../shared/Icon'
import { Stat, TextWithIcon } from '../../../shared/Stat'
import { HTMLText } from '../../../shared/HTMLText'
import { SeriesLink } from './SeriesLink'
import { TagList } from './TagList'
import type { IllustQueryResult } from '../illustQuery'

export type DescriptionProps = IllustQueryResult & {
  id: string
}

export const Description = ({ data }: DescriptionProps) => (
  <Flex
    css={{
      flexDirection: 'column',
      rowGap: '$3',
      backgroundColor: '$surface',
      color: '$onSurface',
      text: '$body',
    }}
  >
    {data ? (
      <HTMLText>{data.description}</HTMLText>
    ) : (
      <Box>
        <Box css={{ w: 256, h: 21 }}>
          <Skeleton css={{ w: 256, h: 14 }} />
        </Box>
        <Box css={{ w: 224, h: 21 }}>
          <Skeleton css={{ w: 224, h: 14 }} />
        </Box>
        <Box css={{ w: 272, h: 21 }}>
          <Skeleton css={{ w: 272, h: 14 }} />
        </Box>
      </Box>
    )}
    {data ? (
      <TagList {...data} tags={data.tags.tags} />
    ) : (
      <Flex css={{ flexWrap: 'wrap', columnGap: '$3', text: '$body' }}>
        <Box css={{ w: 64, h: 21 }}>
          <Skeleton css={{ w: 64, h: 14 }} />
        </Box>
        <Box css={{ w: 64, h: 21 }}>
          <Skeleton css={{ w: 64, h: 14 }} />
        </Box>
        <Box css={{ w: 64, h: 21 }}>
          <Skeleton css={{ w: 64, h: 14 }} />
        </Box>
      </Flex>
    )}
    <Flex css={{ flexWrap: 'wrap', columnGap: '$3' }}>
      {data ? (
        <Stat icon={LikeIcon} value={data.likeCount} title="いいね！" />
      ) : (
        <TextWithIcon icon={LikeIcon} title="いいね！">
          <Skeleton css={{ w: 64, h: 14 }} />
        </TextWithIcon>
      )}
      {data ? (
        <Stat
          icon={BookmarkOnIcon}
          value={data.bookmarkCount}
          title="ブックマーク"
        />
      ) : (
        <TextWithIcon icon={BookmarkOnIcon} title="ブックマーク">
          <Skeleton css={{ w: 64, h: 14 }} />
        </TextWithIcon>
      )}
      {data ? (
        <Stat icon={ViewCountIcon} value={data.viewCount} title="閲覧数" />
      ) : (
        <TextWithIcon icon={ViewCountIcon} title="閲覧数">
          <Skeleton css={{ w: 64, h: 14 }} />
        </TextWithIcon>
      )}
      {data ? (
        <Stat icon={DateTimeIcon} value={data.createDate} title="投稿日時" />
      ) : (
        <TextWithIcon icon={DateTimeIcon} title="投稿日時">
          <Skeleton css={{ w: 64, h: 14 }} />
        </TextWithIcon>
      )}
      {data && data.seriesNavData && (
        <SeriesLink userId={data.userId} {...data.seriesNavData} />
      )}
    </Flex>
  </Flex>
)
