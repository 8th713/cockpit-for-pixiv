import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Warning } from '../shared/Warning'
import { Progress } from '../shared/Progress'
import { Loadable } from '../shared/Loadable'
import { InfoArticle } from './InfoArticle'
import { InfoStore } from '../../store'
import { light } from '../shared/variables'

interface Props {
  store: InfoStore
}

@observer
export class Info extends React.Component<Props> {
  render() {
    const { store } = this.props

    return (
      <Root hidden={!store.opened}>
        <Loadable
          data={store}
          onFetching={() => <Progress />}
          onResolved={() => <InfoArticle illust={store.current!} />}
          onRejected={() => <Warning>Illust load error</Warning>}
        />
      </Root>
    )
  }
}

const Root = styled.div`
  position: relative;
  overflow: auto;

  display: grid;
  flex: 0 0 300px;
  height: 100%;

  background-color: ${light.background.paper};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &[hidden] {
    display: none;
  }

  & a:hover,
  & a:focus {
    text-decoration: underline;
  }
`
