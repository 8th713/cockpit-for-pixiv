import React from 'react'
import styled from 'styled-components'
import { keyMap } from '../../constants'
import { usePickerContext } from '../../hooks'
import { Gallery } from '../Gallery'
import { Hotkeys } from '../Hotkeys'
import { Info } from '../Info'
import { Modal } from '../shared/Modal'

export function Article() {
  const { illustId, actions } = usePickerContext()
  const { unsetElement, goNext, goPrev } = actions

  if (illustId === null) {
    return null
  }

  return (
    <Modal open onRequestClose={unsetElement}>
      <Layout>
        <Gallery />
        <Info />
      </Layout>
      <Hotkeys {...keyMap.goNext} onKeyDown={goNext} />
      <Hotkeys {...keyMap.goPrev} onKeyDown={goPrev} />
    </Modal>
  )
}

const Layout = styled.article`
  all: unset;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
