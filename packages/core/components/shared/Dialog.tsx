import React from 'react'
import styled from 'styled-components'
import { color } from '../theme'
import Modal from './Modal'

type Props = {
  open?: boolean
  onRequestClose: () => unknown
  children?: React.ReactNode
}

const Dialog: React.FC<Props> = props => {
  return (
    <Modal {...props}>
      <Layout>{props.children}</Layout>
    </Modal>
  )
}

const Layout = styled.section`
  all: unset;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  min-width: 280px;
  max-height: 95vh;
  margin: auto;
  border-radius: 8px;
  background-color: ${color.surface};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`
const Header = styled.header`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex: 0 0 64px;
  margin-bottom: -5px;
  padding: 0 24px;
`
const Content = styled.div`
  all: unset;
  box-sizing: border-box;
  overflow: auto;
  display: block;
  flex: 0 1 auto;
  padding: 0 24px 21px;

  &:first-child {
    padding-top: 21px;
  }
`
const Footer = styled.footer`
  all: unset;
  box-sizing: border-box;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  flex: 0 0 52px;
  padding: 8px;

  & > button {
    margin-left: 8px;
  }
`

export default Object.assign(Dialog, { Header, Content, Footer })
