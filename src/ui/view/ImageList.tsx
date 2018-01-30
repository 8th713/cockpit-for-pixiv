import * as React from 'react'
import { observer } from 'mobx-react'
import IO from '@researchgate/react-intersection-observer'
import { Canvas } from './Canvas'
import { ViewStore } from '../../store'

interface Props {
  store: ViewStore
}

export const ImageList = observer(({ store }: Props) => (
  <>
    {store.current!.images.map(image => (
      <IO
        key={image.id}
        disabled={!store.frame}
        root={store.frame}
        rootMargin="0% 0%"
        onChange={image.handleChange}
      >
        <Canvas store={store} image={image} />
      </IO>
    ))}
  </>
))
