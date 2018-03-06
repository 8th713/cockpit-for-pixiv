import * as React from 'react'
import styled from 'styled-components'
import { colors, light, typography } from './variables'

interface ModalProps {
  open: boolean
  onClose: () => any
}

export class Modal extends React.Component<ModalProps> {
  dialog!: HTMLDialogElement

  componentDidMount() {
    this.dialog.addEventListener('cancel', () => {
      this.props.onClose()
    })
    this.updateVisibility(this.props)
  }

  componentWillReceiveProps(nextProps: ModalProps) {
    this.updateVisibility(nextProps)
  }

  updateVisibility(props: ModalProps) {
    if (props.open) {
      this.show()
    } else {
      this.hide()
    }
  }

  show() {
    if (!this.dialog.open) {
      this.dialog.showModal()
    }
  }

  hide() {
    if (this.dialog.open) {
      this.dialog.close()
    }
  }

  handleNode = (dialog: HTMLDialogElement) => {
    this.dialog = dialog
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === this.dialog) {
      this.props.onClose()
    }
  }

  render() {
    return (
      <Dialog innerRef={this.handleNode} onClick={this.handleClick}>
        {this.props.children}
      </Dialog>
    )
  }
}

const Dialog = styled.dialog`
  overflow: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  border: none;
  padding: 0;
  background-color: transparent;

  color: ${light.text.primary};
  font-family: 'Roboto', 'Helvetica Neue', 'arial', 'Noto Sans CJK JP',
    'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
  ${typography.body1};

  &:not([open]) {
    display: none;
  }

  &::backdrop {
    background-color: ${colors.backdrop};
  }
`
