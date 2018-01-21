// @flow
/*global ZipImagePlayer */
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import type Ugoira from '../../entity/ugoira'

type Props = {
  +ugoira: Ugoira,
  onClick(event: SyntheticMouseEvent): void,
}

@observer
export default class UgoiraView extends Component<void, Props, void> {
  static options = {
    chunkSize: 300000,
    loop: true,
    autoStart: true,
    autosize: true,
  }

  canvas: HTMLCanvasElement;
  player: ?ZipImagePlayer;

  componentDidMount() {
    this.createPlayer(this.props.ugoira)
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.ugoira !== prevProps.ugoira) {
      this.dispose()
      this.createPlayer(this.props.ugoira)
    }
  }

  componentWillUnmount() {
    this.dispose()
  }

  createPlayer(ugoira: Ugoira) {
    this.player = new ZipImagePlayer({
      ...UgoiraView.options,
      metadata: ugoira,
      canvas: this.canvas,
      source: ugoira.src,
    })
  }

  dispose() {
    if (this.player) {
      this.player.stop()
      this.player = null
    }
  }

  setRef = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas
  };

  render() {
    const {ugoira, onClick} = this.props
    const {width, height} = ugoira.size

    return (
      <canvas
        className="Image"
        draggable="true"
        key={ugoira.src}
        ref={this.setRef}
        style={{width, height}}
        onClick={onClick}
      />
    )
  }
}
