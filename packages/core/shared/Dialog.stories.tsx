import { ComponentMeta } from '@storybook/react'
import { Box, Title } from './Box'
import { Button } from './Button'
import { DialogContent, DialogBody, DialogFooter, DialogHeader } from './Dialog'
import { Divider } from './Divider'

export default {
  title: 'Shared/Dialog',
  component: DialogContent,
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof DialogContent>

export const Basic = () => (
  <DialogContent>
    <DialogHeader>
      <Title>Lorem ipsum dolor sit amet consectetur</Title>
    </DialogHeader>
    <DialogBody>
      <Box>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        doloremque ipsam ea blanditiis, deserunt ipsa? Consectetur, eum quod
        nobis obcaecati error repellendus quae itaque ad esse atque blanditiis
        optio saepe!
      </Box>
    </DialogBody>
    <DialogFooter>
      <Button>Disagree</Button>
      <Button>Agree</Button>
    </DialogFooter>
  </DialogContent>
)

export const WithDivider = () => (
  <DialogContent>
    <DialogHeader>
      <Title>Lorem ipsum dolor sit amet consectetur</Title>
    </DialogHeader>
    <Divider />
    <DialogBody>
      <Box>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        doloremque ipsam ea blanditiis, deserunt ipsa? Consectetur, eum quod
        nobis obcaecati error repellendus quae itaque ad esse atque blanditiis
        optio saepe!
      </Box>
    </DialogBody>
    <Divider />
    <DialogFooter>
      <Button>Disagree</Button>
      <Button>Agree</Button>
    </DialogFooter>
  </DialogContent>
)
