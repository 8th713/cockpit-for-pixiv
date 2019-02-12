import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { color } from '../theme'
import { BoardContext, PickerProvider, PaddingProvider } from '../../contexts'
import { Progress } from '../shared/Progress'
import { Divide, SimpleLayout } from './Divide'
import { useElementSize } from '../../hooks'

export function Gallery() {
  const illustId = useContext(PickerProvider.ValueContext)!
  const { unsetElement, goFromEvent } = useContext(PickerProvider.ActionContext)
  const padding = useContext(PaddingProvider.ValueContext)
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
