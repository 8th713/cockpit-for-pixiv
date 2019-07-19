import React, { useCallback, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Page } from '../../../interfaces'
import { useRouteActions } from '../../Router'

type Props = Page & {
  root?: React.RefObject<Element>
}

export const PADDING = 32

const getURL = (page: Page, inView: boolean) => {
  if (inView) return page.urls.original
  return page.urls.small.replace('540x540_70', '150x150')
}

const options = {
  rootMargin: '50%',
  threshold: 0,
  triggerOnce: true
}

function LazyImg(props: Props) {
  const { urls, root, ...rest } = props
  const rootElement = root && root.current
  const [ref, inView] = useInView({ ...options, root: rootElement })
  const { go } = useRouteActions()
  const handler = useRef<() => void>()
  const resize = useCallback(
    (node: HTMLImageElement | null) => {
      if (node) {
        handler.current = () => {
          const parent = node.parentElement!
          const boxWidth = parent.clientWidth - PADDING * 2
          const boxHeight = parent.clientHeight - PADDING * 2
          const ratio = Math.min(
            boxWidth / rest.width,
            boxHeight / rest.height,
            1
          )
          node.width = Math.floor(rest.width * ratio)
          node.height = Math.floor(rest.height * ratio)
        }
        handler.current()
        window.addEventListener('resize', handler.current)
      } else if (handler.current) {
        window.removeEventListener('resize', handler.current)
        handler.current = undefined
      }
      ref(node)
    },
    [ref, rest.width, rest.height]
  )

  return (
    <img
      ref={resize}
      alt=""
      {...rest}
      src={getURL(props, inView)}
      onClick={e => {
        e.stopPropagation()
        go(e.shiftKey ? -1 : 1)
      }}
    />
  )
}

export const StandardImg = styled(LazyImg)`
  cursor: pointer;
  object-fit: contain;
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  background-color: rgba(255, 255, 255, var(--high));
`
