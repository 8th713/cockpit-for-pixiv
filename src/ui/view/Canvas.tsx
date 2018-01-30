import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Warning } from '../shared/Warning'
import { Progress } from '../shared/Progress'
import { Cell } from './Cell'
import { UPlayer } from './UPlayer'
import { ViewStore, Image, Ugoira } from '../../store'
import { Status } from '../../types'

interface Props {
  store: ViewStore
  image: Image | Ugoira
}

@observer
export class Canvas extends React.Component<Props> {
  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    this.props.store.cycleIllust(event.shiftKey)
  }

  renderCell(child: React.ReactNode) {
    const { image, store } = this.props
    const scale = store.calcScale(image)
    const style = {
      width: image.width * scale,
      height: image.height * scale
    }

    return (
      <Cell id={image.id} style={style} onClick={this.handleClick}>
        {child}
      </Cell>
    )
  }

  render() {
    const { image } = this.props

    switch (image.status) {
      case Status.IDLING:
        return this.renderCell(null)
      case Status.FETCHING:
        return this.renderCell(<Progress size={128} />)
      case Status.RESOLVED:
        if (image instanceof Ugoira) {
          return this.renderCell(<UPlayer data={image} />)
        } else {
          return this.renderCell(<Img src={image.src} alt={image.alt} />)
        }
      case Status.REJECTED:
        return this.renderCell(<Warning>{`${image.id} Not found`}</Warning>)
    }
  }
}

const Img = styled.img`
  width: 100%;
  height: 100%;
  background-color: #fff;
`
