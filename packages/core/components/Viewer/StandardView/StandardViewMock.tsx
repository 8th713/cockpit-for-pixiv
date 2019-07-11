import React from 'react'
import styled from 'styled-components'
import { useRouteActions } from '../../Router'
import { Progress } from '../../shared/Progress'
import { ErrorDialog } from './ErrorDialog'

type Props = {
  id?: string
  children?: React.ReactNode
}

export function StandardViewMock({ id, children }: Props) {
  const { unset, go } = useRouteActions()
  const goFromEvent: React.MouseEventHandler = e => {
    e.stopPropagation()
    go(e.shiftKey ? -1 : 1)
  }

  return (
    <Root>
      <Container>
        <span onClick={unset}>
          <Box>
            {!id && <Progress onClick={goFromEvent} />}
            {id && <ErrorDialog id={id} />}
          </Box>
        </span>
      </Container>
      {children}
    </Root>
  )
}

const Root = styled.section`
  outline: none;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
  &[hidden] {
    opacity: 0;
  }
`
const Container = styled.div`
  position: relative;
`
const Box = styled.div`
  box-sizing: border-box;
  outline: none;
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - var(--caption-height));
  padding: 32px;
  flex-direction: column;
`

StandardViewMock.Root = Root
StandardViewMock.Container = Container
StandardViewMock.Box = Box
