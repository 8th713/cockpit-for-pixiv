import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Ugoira } from '../../store'

interface Props {
  data: Ugoira
}

@observer
export class UPlayer extends React.Component<Props> {
  private canvas!: HTMLCanvasElement | null
  private player!: ZipImagePlayer | null
  private observer: MutationObserver

  constructor(props: Props) {
    super(props)
    this.observer = new MutationObserver(mutations => {
      const mutation = mutations[0]

      this.props.data.setSize(mutation.target as HTMLCanvasElement)
    })
  }

  reset(canvas: HTMLCanvasElement) {
    const { data } = this.props

    this.canvas = canvas
    this.observer.observe(canvas, {
      attributes: true
    })
    this.player = new ZipImagePlayer({
      chunkSize: 300000,
      loop: true,
      autoStart: true,
      autosize: true,
      canvas: canvas,
      source: data.src,
      metadata: data
    })
  }

  dispose() {
    if (this.canvas && this.player) {
      this.player.stop()
      this.player = null
      this.observer.disconnect()
      this.canvas = null
    }
  }

  handleNode = (canvas: HTMLCanvasElement | null) => {
    this.dispose()
    if (canvas) {
      this.reset(canvas)
    }
  }

  render() {
    const { data } = this.props

    return <Img draggable={true} key={data.src} innerRef={this.handleNode} />
  }
}

const Img = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: #fff;
`
