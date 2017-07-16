// @flow
import './styles/Canvas.css'
import {observer} from 'mobx-react'
import React, {PureComponent} from 'react'
import ImageView from './Image'
import UgoiraView from './Ugoira'
import Image from '../../entity/image'
import Ugoira from '../../entity/ugoira'
import type {UseCase} from '../../useCase'

type GrabData = {
  x: number,
  y: number,
  left: number,
  top: number,
}

type Props = {
  // $FlowFixMe
  +images: Image[] | Ugoira[],
  +useCase: UseCase,
}

@observer
export default class Canvas extends PureComponent<void, Props, void> {
  element: HTMLDivElement;
  grabData: GrabData;

  setRef = (element: HTMLDivElement) => {
    this.element = element
  }

  handleGrab = (event: SyntheticDragEvent) => {
    this.grabData = {
      x: event.clientX,
      y: event.clientY,
      left: this.element.scrollLeft,
      top: this.element.scrollTop
    }
  }

  handleDrag = (event: SyntheticDragEvent) => {
    const {clientX, clientY} = event

    if (!clientX && !clientY) { return }

    const {x, y, left, top} = this.grabData

    this.element.scrollLeft = left - (clientX - x)
    this.element.scrollTop = top - (clientY - y)
  }

  handleDragOver = (event: SyntheticDragEvent) => {
    event.dataTransfer.dropEffect = 'move'
    event.preventDefault()
  };

  handleContentClick = (event: SyntheticMouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const dir = event.shiftKey ? -1 :1
    this.props.useCase.route.step(dir)
  };

  handleWrapperClick = (event: SyntheticMouseEvent) => {
    this.props.useCase.route.close()
  };

  componentDidUpdate() {
    if (this.element) {
      this.element.focus()
    }
  }

  renderChild = (node: Image | Ugoira) => {
    if (node instanceof Image) {
      return (
        <ImageView
          key={node.src}
          image={node}
          useCase={this.props.useCase}
          onClick={this.handleContentClick}
        />
      )
    }
    if (node instanceof Ugoira) {
      return (
        <UgoiraView
          key={node.src}
          ugoira={node}
          onClick={this.handleContentClick}
        />
      )
    }
  };

  render() {
    const children = this.props.images.map(this.renderChild)

    return (
      <div
        ref={this.setRef}
        className="Canvas-wrapper"
        tabIndex={1}
        onClick={this.handleWrapperClick}
        onDragStart={this.handleGrab}
        onDrag={this.handleDrag}
        onDragOver={this.handleDragOver}
      >
        <div className="Canvas">{children}</div>
      </div>
    )
  }
}
