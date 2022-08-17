import { useLayoutEffect, useRef } from 'react'
import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { Skeleton } from '../../shared/Skeleton'
import { styled } from '../../stitches.config'
import { useNavigate } from '../App/useNavigate'
import { useStickyRecentWorks } from './recentWorksQuery'
import { WorkButton } from './WorkButton'

export interface RecentWorksProps {
  illustId: string
}

const emptyArray = Array(10)
  .fill(null)
  .map((_, idx) => <Skeleton key={idx} width={168} height={168} />)

export function RecentWorks({ illustId }: RecentWorksProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLButtonElement>(null)
  const { works } = useStickyRecentWorks(illustId)
  const navigate = useNavigate()
  const go = (n: number) => {
    if (!works) return

    const max = works.length
    const currentIndex = works.findIndex((work) => work.id === illustId)

    n = currentIndex === -1 ? 0 : n

    const targetIndex = (max + currentIndex + n) % max
    const work = works[targetIndex]

    navigate(work.id)
  }

  useLayoutEffect(() => {
    const rootNode = rootRef.current
    const selectedNode = selectedRef.current

    if (!rootNode) return
    if (selectedNode) {
      const offset = rootNode.offsetWidth / 2 - 168 / 2

      rootNode.scrollLeft = selectedNode.offsetLeft - offset
    } else {
      rootNode.scrollLeft = 0
    }
  }, [works, illustId])

  return (
    <Container ref={rootRef}>
      <Content>
        {works
          ? works.map((work) => (
              <WorkButton
                key={work.id}
                work={work}
                disabled={work.id === illustId}
                onClick={() => navigate(work.id)}
              />
            ))
          : emptyArray}
      </Content>
      <Hotkey
        {...KEY_ASSIGNMENT.goPrevRelatedIllust}
        disabled={!works}
        onKeydown={() => go(-1)}
      />
      <Hotkey
        {...KEY_ASSIGNMENT.goNextRelatedIllust}
        disabled={!works}
        onKeydown={() => go(1)}
      />
    </Container>
  )
}

const Container = styled('div', {
  baseStyle: true,
  overflowX: 'scroll',
  backgroundColor: '$surface',
  color: '$onSurface',
})

const Content = styled('div', {
  boxSizing: 'content-box',
  display: 'flex',
  width: 'fit-content',
  height: 168,
  margin: 0,
  padding: '$3',
  columnGap: '$2',
})
