import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BoardContext, PaddingProvider, PickerProvider } from '../../contexts'
import { useElementSize } from '../../hooks'
import { Progress } from '../shared/Progress'
import { color } from '../theme'
import { Divide, SimpleLayout } from './Divide'

export function Gallery() {
  const illustId = PickerProvider.useIllustId()!
  const { unsetElement, goFromEvent } = PickerProvider.usePickerAction()
  const padding = PaddingProvider.usePaddingValue()
  const [ref, size, node] = useElementSize<HTMLDivElement>(padding)

  useEffect(() => {
    if (node) {
      node.scrollTop = 0
      node.focus()
    }
  }, [illustId])

  return (
    <BoardContext.Provider value={{ size, node }}>
      <ScrollView tabIndex={0} ref={ref} onClick={unsetElement}>
        <React.Suspense
          fallback={
            <SimpleLayout>
              <Progress onClick={goFromEvent} />
            </SimpleLayout>
          }
        >
          <Divide illustId={illustId} />
        </React.Suspense>
      </ScrollView>
    </BoardContext.Provider>
  )
}

const ScrollView = styled.div`
  user-select: none;
  position: relative;
  overflow: auto;
  width: 100%;
  flex: 100%;
  &:focus {
    outline: 1px solid ${color.primary};
    outline-offset: -1px;
  }
`
