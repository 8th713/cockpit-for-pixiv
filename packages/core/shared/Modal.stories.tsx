import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { Box } from './Box'
import { Button } from './Button'
import { Modal as Component } from './Modal'

export default {
  title: 'Components/Modal',
  component: Component,
} as Meta

const Example = () => {
  const [isOpen, setOpen] = useState(false)
  const close = setOpen.bind(null, false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Component open={isOpen} onClose={close}>
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
      </Component>
    </>
  )
}

export const Modal = () => <Example />
