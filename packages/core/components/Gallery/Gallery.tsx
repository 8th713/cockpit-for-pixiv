import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PickerProvider, BoardProvider } from '../../contexts'
import { Progress } from '../shared/Progress'
import { Divide, SimpleLayout } from './Divide'

export function Gallery() {
  const illustId = PickerProvider.useValue()!
  const { unsetElement, goFromEvent } = PickerProvider.useAction()
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { current } = ref

    if (current) {
      current.scrollTop = 0
      current.focus()
    }
  }, [illustId])

  return (
    <BoardProvider observe={ref}>
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
    </BoardProvider>
  )
}

const ScrollView = styled.div`
  user-select: none;
  position: relative;
  overflow: auto;
  width: 100%;
  flex: 100%;
`
