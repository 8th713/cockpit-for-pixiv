import { Meta, Story } from '@storybook/react'
import { useState } from 'react'
import { Box } from './Box'
import { Button } from './Button'
import { Modal } from './Modal'

export default {
  title: 'Shared/Modal',
  component: Modal,
} as Meta

export const Example: Story = () => {
  const [isOpen, setOpen] = useState(true)
  const close = setOpen.bind(null, false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={isOpen} onClose={close}>
        <Box
          css={{
            maxWidth: '80%',
            margin: 'auto',
            padding: '$3',
            backgroundColor: '$secondary',
          }}
        >
          <p>Dialog Content</p>
          <Button onClick={close}>Close</Button>
        </Box>
      </Modal>
    </>
  )
}
Example.storyName = 'Modal'
