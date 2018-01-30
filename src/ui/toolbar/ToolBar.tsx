import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { FitSwitch } from './FitSwitch'
import { SpreadSwitch } from './SpreadSwitch'
import { InfoSwitch } from './InfoSwitch'
import { BookmarkSwitch } from './BookmarkSwitch'
import { LikeSwitch } from './LikeSwitch'
import { TweetSwitch } from './TweetSwitch'
import { DownloadSwitch } from './DownloadSwitch'
import { HelpSwitch } from './HelpSwitch'
import { AppStore } from '../../store'

interface Props {
  store: AppStore
}

export const ToolBar = observer(({ store }: Props) => (
  <Root>
    <FitSwitch store={store.view} />
    <SpreadSwitch store={store.view} />
    <Divider />
    <InfoSwitch store={store.info} />
    <BookmarkSwitch store={store.bookmark} />
    <LikeSwitch illust={store.view.current} />
    <TweetSwitch illust={store.view.current} />
    <DownloadSwitch illust={store.view.current} />
    <Space />
    <HelpSwitch store={store.help} />
  </Root>
))

const Root = styled.div`
  user-select: none;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 48px;
  height: 100%;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.65), transparent);
  color: #fff;
`

const Divider = styled.hr`
  height: 1px;
  margin: 0;
  border: none;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0.12);
`

const Space = styled.div`
  flex-grow: 1;
`
