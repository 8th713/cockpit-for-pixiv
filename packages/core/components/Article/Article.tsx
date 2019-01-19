import React from 'react'
import styled from 'styled-components'
import {
  PickerProvider,
  FitProvider,
  SpreadProvider,
  ExpansionProvider
} from '../../contexts'
import { Modal } from '../shared/Modal'
import { Gallery } from '../Gallery'
import { Info } from '../Info'
import { Hotkeys } from '../Hotkeys'
import { keyMap } from '../../constants/keyMap'

export function Article() {
  const id = PickerProvider.useValue()
  const { unsetElement, goNext, goPrev } = PickerProvider.useAction()

  if (id === null) {
    return null
  }

  return (
    <Modal open onRequestClose={unsetElement}>
      <Layout>
        <FitProvider>
          <SpreadProvider>
            <Gallery />
            <ExpansionProvider>
              <Info />
            </ExpansionProvider>
          </SpreadProvider>
        </FitProvider>
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
