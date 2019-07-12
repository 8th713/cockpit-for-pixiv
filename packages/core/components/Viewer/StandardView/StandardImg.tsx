import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Page } from '../../../interfaces'
import { useRouteActions } from '../../Router'

type Props = Page & {
  root?: React.RefObject<Element>
}

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

  return (
    <img
      ref={ref}
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
