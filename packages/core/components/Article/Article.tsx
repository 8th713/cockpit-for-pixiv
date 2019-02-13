import React from 'react'
import styled from 'styled-components'
import {
  PickerActionContext,
  PickerValueContext,
  FitProvider,
  SpreadProvider
} from '../../contexts'
import { usePicker } from '../../hooks'
import { Modal } from '../shared/Modal'
import { Gallery } from '../Gallery'
import { Info } from '../Info'
import { Hotkeys } from '../Hotkeys'
import { keyMap } from '../../constants'

export function Article() {
  const { illustId, actions } = usePicker()

  if (illustId === null) {
    return null
  }

  return (
    <Modal open onRequestClose={actions.unsetElement}>
      <Layout>
        <PickerActionContext.Provider value={actions}>
          <PickerValueContext.Provider value={illustId}>
            <FitProvider>
              <SpreadProvider>
                <Gallery />
                <Info />
              </SpreadProvider>
            </FitProvider>
          </PickerValueContext.Provider>
        </PickerActionContext.Provider>
      </Layout>
      <Hotkeys {...keyMap.goNext} onKeyDown={actions.goNext} />
      <Hotkeys {...keyMap.goPrev} onKeyDown={actions.goPrev} />
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
