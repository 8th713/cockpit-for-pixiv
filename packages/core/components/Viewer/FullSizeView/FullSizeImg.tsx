import React from 'react'
import styled from 'styled-components'
import { Page } from '../../../interfaces'

type Props = Page

function FullImgImpl({ urls, ...rest }: Props) {
  const src = urls.original
  return <img alt="" {...rest} src={src} />
}

export const FullSizeImg = styled(FullImgImpl)`
  display: block;
  margin: auto;
  background-color: rgba(255, 255, 255, var(--high));
`
