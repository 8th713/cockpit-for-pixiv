import React, { useMemo } from 'react'
import styled from 'styled-components'
import { SpreadStatus } from '../../../constants'
import { PaddingProvider, SpreadProvider } from '../../../contexts'
import { Pages } from '../../../interfaces'
import { Img } from './Img'

type Props = {
  pages: Pages
  children?: never
}

export function Multiple({ pages }: Props) {
  const padding = PaddingProvider.usePaddingValue()
  const spread = SpreadProvider.useSpreadValue()
  const children = useMemo(
    () => pages.map(page => <Img key={page.urls.original} page={page} />),
    [pages]
  )
  const styles = { padding, rowGap: padding }

  switch (spread) {
    case SpreadStatus.SPREAD_SHIFT:
      if (pages.length > 2)
        return <TwoColumnAlt style={styles}>{children}</TwoColumnAlt>
    case SpreadStatus.SPREAD:
      return <TwoColumn style={styles}>{children}</TwoColumn>
    case SpreadStatus.NONE:
      return <OneColumn style={styles}>{children}</OneColumn>
  }
}

const OneColumn = styled.div`
  box-sizing: border-box;
  display: grid;
  width: fit-content;
  min-width: 100%;
  min-height: 100%;
  align-content: center;
  justify-items: center;
  align-items: start;
`
const TwoColumn = styled(OneColumn)`
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  & > *:nth-child(odd) {
    grid-column: 2;
    justify-self: start;
  }
  & > *:nth-child(even) {
    grid-column: 1;
    justify-self: end;
  }
`
const TwoColumnAlt = styled(OneColumn)`
  box-sizing: border-box;
  display: grid;
  width: fit-content;
  min-width: 100%;
  min-height: 100%;
  align-content: center;
  justify-items: center;
  align-items: start;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: dense;
  & > *:nth-child(odd) {
    grid-column: 1;
    justify-self: end;
  }
  & > *:nth-child(even) {
    grid-column: 2;
    justify-self: start;
  }
  & > *:first-child {
    grid-column: 1 / 3;
    justify-self: center;
  }
`
