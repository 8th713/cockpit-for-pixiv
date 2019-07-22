import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { Page } from '../../../interfaces'
import { useRouteActions } from '../../Router'
import { useLazyObserver } from './StandardView'

type Props = Page

export const PADDING = 32

const getURL = (page: Page, inView: boolean) => {
  if (inView) return page.urls.original
  return page.urls.small.replace('540x540_70', '150x150')
}

function LazyImg(props: Props) {
  const { urls, ...rest } = props
  const [inView, setInVeiw] = useState(false)
  const observer = useLazyObserver()
  const { go } = useRouteActions()
  const handler = useRef<() => void>()
  const nodeRef = useRef<HTMLImageElement | null>(null)
  const setRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current)
      }
      if (handler.current) {
        window.removeEventListener('resize', handler.current)
        handler.current = undefined
      }
      nodeRef.current = node
      if (node) {
        observer.observe(node, entry => {
          const inView = entry.isIntersecting
          if (inView) {
            setInVeiw(inView)
            observer.unobserve(entry.target)
          }
        })
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
      }
    },
    [observer, rest.width, rest.height]
  )

  return (
    <img
      ref={setRef}
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
