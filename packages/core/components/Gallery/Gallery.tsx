import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useBoardContext, usePickerContext } from '../../hooks'
import { Progress } from '../shared/Progress'
import { color } from '../theme'
import { Divide, SimpleLayout } from './Divide'

export function Gallery() {
  const { illustId, actions } = usePickerContext()
  const { unsetElement, goFromEvent } = actions
  const [ref, , node] = useBoardContext()

  useEffect(() => {
    if (node) {
      node.scrollTop = 0
      node.focus()
    }
  }, [illustId])

  return (
    <ScrollView tabIndex={0} ref={ref} onClick={unsetElement}>
      <React.Suspense
        fallback={
          <SimpleLayout>
            <Progress onClick={goFromEvent} />
          </SimpleLayout>
        }
      >
        <Divide illustId={illustId!} />
      </React.Suspense>
    </ScrollView>
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
