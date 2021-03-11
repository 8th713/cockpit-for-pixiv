import { Meta, Story } from '@storybook/react'
import { useState } from 'react'
import { Button } from './Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './Dialog'
import { Divider } from './Divider'
import { Modal } from './Modal'
import { Paragraph, Title } from './Text'

export default {
  title: 'Shared/Dialog',
  component: Dialog,
  subcomponents: { DialogHeader, DialogContent, DialogFooter },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta

export const FullSet = () => (
  <Dialog>
    <DialogHeader>
      <Title>Use Google's location service?</Title>
    </DialogHeader>
    <DialogContent>
      <Paragraph css={{ fontSize: '$h2' }}>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </Paragraph>
    </DialogContent>
    <DialogFooter>
      <Button variant="inherit">Disagree</Button>
      <Button variant="inherit">Agree</Button>
    </DialogFooter>
  </Dialog>
)

export const WithoutFooter = () => (
  <Dialog>
    <DialogHeader>
      <Title>Use Google's location service?</Title>
    </DialogHeader>
    <DialogContent>
      <Paragraph css={{ fontSize: '$h2' }}>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </Paragraph>
    </DialogContent>
  </Dialog>
)

export const WithDivider = () => (
  <Dialog>
    <DialogHeader>
      <Title>Use Google's location service?</Title>
    </DialogHeader>
    <Divider />
    <DialogContent>
      <Paragraph css={{ fontSize: '$h2' }}>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </Paragraph>
    </DialogContent>
    <Divider />
    <DialogFooter>
      <Button variant="inherit">Disagree</Button>
      <Button variant="inherit">Agree</Button>
    </DialogFooter>
  </Dialog>
)

export const WithModal = () => {
  const [isOpen, setOpen] = useState(true)
  const close = setOpen.bind(null, false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={isOpen} onClose={close}>
        <Dialog>
          <DialogHeader>
            <Title>Use Google's location service?</Title>
          </DialogHeader>
          <Divider />
          <DialogContent>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
          </DialogContent>
          <Divider />
          <DialogFooter>
            <Button variant="inherit" onClick={close}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </Modal>
    </>
  )
}

export const WithLongContent: Story = () => {
  const [isOpen, setOpen] = useState(true)
  const close = setOpen.bind(null, false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={isOpen} onClose={close}>
        <Dialog>
          <DialogHeader>
            <Title>Use Google's location service?</Title>
          </DialogHeader>
          <Divider />
          <DialogContent>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
            <Paragraph css={{ fontSize: '$h2' }}>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </Paragraph>
          </DialogContent>
          <Divider />
          <DialogFooter>
            <Button onClick={close}>Close</Button>
            <Button variant="inherit" onClick={close}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </Modal>
    </>
  )
}
