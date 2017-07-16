// @flow
import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import Spinner from '../shared/Spinner'
import LazyLoader from '../../service/lazyLoader'
import type {UseCase} from '../../useCase'
import type Image from '../../entity/image'

type Props = {
  +image: Image,
  +useCase: UseCase,
  onClick(event: SyntheticMouseEvent): void,
}

@observer
export default class ImageView extends PureComponent<void, Props, void> {
  dummy: HTMLDivElement;

  setRef = (dummy?: HTMLDivElement) => {
    if (dummy && !this.dummy) {
      this.dummy = dummy
      LazyLoader.observe(dummy, this.handleIntersection)
    }
  };

  handleIntersection = () => {
    this.props.useCase.image.load(this.props.image)
  };

  render() {
    const {image, onClick} = this.props

    if (image.isLoading) {
      return (
        <div className="Image-dummy">
          <Spinner size={512} onClick={onClick} />
        </div>
      )
    }

    if (!image.isFetched) {
      return (
        <div
          className="Image-dummy"
          ref={this.setRef}
          onClick={onClick}
        />
      )
    }

    const {width, height} = image.size

    return (<img
      className="Image"
      src={image.src}
      alt={image.alt}
      width={width}
      height={height}
      onClick={onClick}
    />)
  }
}
