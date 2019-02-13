import React, { useContext } from 'react'
import styled from 'styled-components'
import { color } from '../../theme'
import { IllustContext } from '../../../contexts'
import { Comment } from './Comment'
import { TagList } from './TagList'
import { SeriesNav } from './SeriesNav'
import { Stats } from './Stats'

export function Desctiption() {
  const { read } = useContext(IllustContext)
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
