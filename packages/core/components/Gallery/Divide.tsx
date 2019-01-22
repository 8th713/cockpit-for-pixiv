import React from 'react'
import styled from 'styled-components'
import { usePages } from '../../hooks'
import { Single } from './Single'
import { Multiple } from './Multiple'
import { Ugoira } from './Ugoira'

type Props = {
  illustId: string
  children?: never
}

export function Divide({ illustId }: Props) {
  const { read, retry } = usePages(illustId)

  try {
    const { pages, count, isUgoira } = read()
    if (isUgoira) {
      return <Ugoira id={illustId} page={pages[0]} />
    }
    if (count > 1) {
      return <Multiple pages={pages} />
    }
    return <Single page={pages[0]} />
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return (
      <SimpleLayout>
        <div onClick={retry}>Retry</div>
      </SimpleLayout>
    )
  }
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
