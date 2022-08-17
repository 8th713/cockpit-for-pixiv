import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Title } from './Box'
import { Button } from './Button'
import { DialogBody, DialogContent, DialogFooter, DialogHeader } from './Dialog'
import { Modal } from './Modal'

export default {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    viewMode: 'story',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />
const bodyContent = Array(15)
  .fill(null)
  .map((_, i) => (
    <p key={i}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, consequuntur.
      Fugiat et asperiores, repudiandae, debitis quaerat, maxime esse eligendi
      nam temporibus ratione eius pariatur vel. Doloribus, sequi. Minus, est
      rerum.
    </p>
  ))

export const Closed = Template.bind({})
Closed.args = {
  children: (
    <div
      style={{
        margin: 'auto',
        padding: 36,
        backgroundColor: 'darkblue',
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, consequuntur.
      Fugiat et asperiores, repudiandae, debitis quaerat, maxime esse eligendi
      nam temporibus ratione eius pariatur vel. Doloribus, sequi. Minus, est
      rerum.
    </div>
  ),
}

export const Opened = Template.bind({})
Opened.args = {
  ...Closed.args,
  open: true,
}

export const LongContent = Template.bind({})
LongContent.args = {
  open: true,
  children: (
    <DialogContent>
      <DialogHeader>
        <Title>Lorem ipsum dolor sit amet consectetur</Title>
      </DialogHeader>
      <DialogBody>{bodyContent}</DialogBody>
      <DialogFooter>
        <Button>Agree</Button>
      </DialogFooter>
    </DialogContent>
  ),
}

export const Controlled = () => {
  const [isOpen, setOpen] = useState(false)
  const close = setOpen.bind(null, false)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Modal open={isOpen} onClose={close}>
        <DialogContent>
          <DialogHeader>
            <Title>Lorem ipsum dolor sit amet consectetur</Title>
          </DialogHeader>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            consequuntur. Fugiat et asperiores, repudiandae, debitis quaerat,
            maxime esse eligendi nam temporibus ratione eius pariatur vel.
            Doloribus, sequi. Minus, est rerum.
          </DialogBody>
          <DialogFooter>
            <Button onClick={close}>Agree</Button>
          </DialogFooter>
        </DialogContent>
      </Modal>
    </>
  )
}
