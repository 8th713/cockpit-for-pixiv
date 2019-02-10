import React, { useContext } from 'react'
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
import { keyMap } from '../../constants'

export function Article() {
  const id = useContext(PickerProvider.ValueContext)
  const { unsetElement, goNext, goPrev } = useContext(
    PickerProvider.ActionContext
  )

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
