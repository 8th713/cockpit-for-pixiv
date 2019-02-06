import React from 'react'
import styled from 'styled-components'
import { usePages } from '../../hooks'
import { Single } from './Single'
import { Multiple } from './Multiple'
import { Ugoira } from './Ugoira'
import { Button } from '../shared/Button'

type Props = {
  illustId: string
  children?: never
}

export function Divide({ illustId }: Props) {
  const { read, retry } = usePages(illustId)
  const response = read()

  if (!response) {
    return (
      <SimpleLayout>
        <Button
          v="contained"
          c="primary"
          onClick={e => {
            e.stopPropagation()
            retry()
          }}
        >
          Retry
        </Button>
      </SimpleLayout>
    )
  }

  const { pages, count, isUgoira } = response

  if (isUgoira) {
    return <Ugoira id={illustId} page={pages[0]} />
  }
  if (count > 1) {
    return <Multiple pages={pages} />
  }
  return <Single page={pages[0]} />
}

export const SimpleLayout = styled.div`
  box-sizing: border-box;
  display: grid;
  width: fit-content;
  min-width: 100%;
  min-height: 100%;
  align-content: center;
  justify-items: center;
  align-items: start;
`
