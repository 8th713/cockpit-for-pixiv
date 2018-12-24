import React from 'react'
import styled from 'styled-components'
import { color } from '../../theme'
import { AsyncStatus } from '../../../interfaces'
import { IllustProvider } from '../../../contexts'
import { Progress } from '../../shared/Progress'
import { Comment } from './Comment'
import { TagList } from './TagList'
import { SeriesNav } from './SeriesNav'
import { Stats } from './Stats'

export const Desctiption: React.FC = () => {
  const result = IllustProvider.useValue()

  switch (result.status) {
    case AsyncStatus.Loading:
      return (
        <Layout>
          <Progress size={64} />
        </Layout>
      )
    case AsyncStatus.Failure:
      return <Layout />
    case AsyncStatus.Success: {
      const { value } = result

      return (
        <Layout>
          <Comment illust={value} />
          <TagList illust={value} />
          <SeriesNav illust={value} />
          <Stats illust={value} />
        </Layout>
      )
    }
  }
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
