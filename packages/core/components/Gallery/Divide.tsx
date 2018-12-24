import React from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../interfaces'
import { PickerProvider, PagesProvider } from '../../contexts'
import { Progress } from '../shared/Progress'
import { Single } from './Single'
import { Multiple } from './Multiple'
import { Ugoira } from './Ugoira'

export const Divide = React.memo(function Divide() {
  const result = PagesProvider.useValue()
  const retry = PagesProvider.useAction()
  const { goFromEvent } = PickerProvider.useAction()

  switch (result.status) {
    case AsyncStatus.Loading: {
      return (
        <Layout>
          <Progress onClick={goFromEvent} />
        </Layout>
      )
    }
    case AsyncStatus.Failure: {
      return (
        <Layout>
          <div onClick={retry}>Retry</div>
        </Layout>
      )
    }
    case AsyncStatus.Success: {
      const { id, value, count, ugoira } = result

      if (ugoira) {
        return <Ugoira id={id!} page={value[0]} />
      }
      if (count > 1) {
        return <Multiple pages={value} />
      }
      return <Single page={value[0]} />
    }
  }
})

const Layout = styled.div`
  box-sizing: border-box;
  display: grid;
  width: fit-content;
  min-width: 100%;
  min-height: 100%;
  align-content: center;
  justify-items: center;
  align-items: start;
`
