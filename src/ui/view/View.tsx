import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import * as cx from 'classnames'
import { Warning } from '../shared/Warning'
import { Modal } from '../shared/Modal'
import { Progress } from '../shared/Progress'
import { Loadable } from '../shared/Loadable'
import { Cell } from './Cell'
import { ImageList } from './ImageList'
import { ViewStore } from '../../store'

interface Props {
  store: ViewStore
}

@observer
export class View extends React.Component<Props> {
  handleNode = (node: HTMLElement | null) => {
    this.props.store.setFrame(node)
  }

  handleClose = () => {
    this.props.store.close()
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    this.props.store.cycleIllust(event.shiftKey)
  }

  render() {
    const { store, children } = this.props

    return (
      <Modal open={store.opened} onClose={this.handleClose}>
        {children}
        <Root
          innerRef={this.handleNode}
          onClick={this.handleClose}
          tabIndex={0}
        >
          <Loadable
            data={store}
            onFetching={() => (
              <Layout padding={store.padding}>
                <Cell style={store.cell} onClick={this.handleClick}>
                  <Progress size={128} />
                </Cell>
              </Layout>
            )}
            onResolved={() => {
              const layoutClass = cx({
                [store.finalBinding]: store.finalSpread
              })

              return (
                <Layout className={layoutClass} padding={store.padding}>
                  {store.finalShift && <Cell />}
                  <ImageList store={store} />
                </Layout>
              )
            }}
            onRejected={() => (
              <Layout padding={store.padding}>
                <Cell style={store.cell} onClick={this.handleClick}>
                  <Warning>Illust load error</Warning>
                </Cell>
              </Layout>
            )}
          />
        </Root>
      </Modal>
    )
  }
}

const Root = styled.div`
  user-select: none;
  outline: none;
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
  margin-left: -48px;
`

interface LayoutProps {
  padding: number
}

const getPadding = ({ padding }: LayoutProps) => padding

const Layout = styled.div`
  box-sizing: border-box;
  display: grid;
  width: fit-content;
  min-width: 100%;
  min-height: 100%;
  grid-template-columns: 1fr;
  grid-row-gap: ${getPadding}px;
  padding: ${getPadding}px;
  align-content: center;
  justify-items: center;
  align-items: center;

  &.ltr {
    grid-template-columns: 1fr 1fr;
  }

  &.rtl {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense;
  }
`
