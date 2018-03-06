import * as React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import styled from 'styled-components'
import { Modal } from '../shared/Modal'
import { KeyMap } from './KeyMap'
import { Settings } from './Settings'
import { About } from './About'
import { AppStore } from '../../store'
import { light, typography } from '../shared/variables'

interface Props {
  store: AppStore
}

@observer
export class Help extends React.Component<Props> {
  @observable isFetching!: boolean

  handleClose = () => {
    this.props.store.help.close()
  }

  render() {
    const { help, view } = this.props.store

    return (
      <Modal open={help.opened} onClose={this.handleClose}>
        <Root>
          <Title>{`${help.name} ${help.version}`}</Title>
          <Settings store={view} />
          <KeyMap store={help} />
          <About store={help} />
        </Root>
      </Modal>
    )
  }
}

const Root = styled.div`
  overflow: auto;
  display: grid;
  width: fit-content;
  min-width: 360px;
  height: fit-content;
  margin: auto;
  padding: 8px 0;
  border-radius: 2px;
  background-color: ${light.background.paper};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`

const Title = styled.h1`
  padding: 16px;
  ${typography.headline};
`
