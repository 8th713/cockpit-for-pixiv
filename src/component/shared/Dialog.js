// @flow
import './styles/Dialog.css'
import React, {PureComponent} from 'react'

type Props = {
  +children: any,
  +open: boolean,
  onClose(): void,
}

export default class Dialog extends PureComponent<void, Props, void> {
  dialog: HTMLDialogElement;

  componentDidMount() {
    this.dialog.addEventListener('cancel', () => {
      this.props.onClose()
    })
    this.updateVisibility(this.props)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updateVisibility(nextProps)
  }

  updateVisibility(props: Props) {
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

  setRef = (dialog: HTMLDialogElement) => {
    this.dialog = dialog
  };

  handleClick = (event: SyntheticMouseEvent) => {
    if (event.target === this.dialog) {
      this.props.onClose()
    }
  };

  render() {
    const {children} = this.props

    return (
      <dialog
        className="Dialog"
        ref={this.setRef}
        onClick={this.handleClick}
      >{children}</dialog>
    )
  }
}
