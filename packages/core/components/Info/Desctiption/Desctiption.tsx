import React from 'react'
import styled from 'styled-components'
import { IllustProvider } from '../../../contexts'
import { color } from '../../theme'
import { Comment } from './Comment'
import { SeriesNav } from './SeriesNav'
import { Stats } from './Stats'
import { TagList } from './TagList'

export function Desctiption() {
  const { read } = IllustProvider.use()
  const illust = read()

  if (illust === null) return <Layout />

  return (
    <Layout>
      <Comment illust={illust} />
      <TagList illust={illust} />
      <SeriesNav illust={illust} />
      <Stats illust={illust} />
    </Layout>
  )
}

const Layout = styled.div`
  all: unset;
  display: grid;
  gap: 24px;

  a {
    all: unset;
    cursor: pointer;
    color: ${color.primary};
  }
  a:focus {
    outline: auto currentColor;
  }
`
