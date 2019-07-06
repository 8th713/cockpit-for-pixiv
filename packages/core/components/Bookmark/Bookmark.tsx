import React from 'react'
import { Illust } from '../../interfaces'
import { Dialog } from '../shared/Dialog'
import { Modal } from '../shared/Modal'
import { Progress } from '../shared/Progress'
import { Text } from '../shared/Text'
import { FormLoader } from './FormLoader'
import { FormMock } from './FormMock'
import { useToggleForm } from './ToggleForm'

type Props = {
  illust: Illust
}

export function Bookmark({ illust }: Props) {
  const [open, setOpen] = useToggleForm()
  const handleClose = () => setOpen(false)
  const children = <FormMock.Thumbnail src={illust.urls.thumb} />

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog onBackdropClick={handleClose}>
        <Dialog.Header>
          <Text kind="h1">{illust.title}</Text>
        </Dialog.Header>
        <Dialog.Divider />
        <React.Suspense
          fallback={
            <FormMock>
              <FormMock.FlexContainer>
                {children}
                <FormMock.FlexItem>
                  <Progress />
                </FormMock.FlexItem>
              </FormMock.FlexContainer>
            </FormMock>
          }
        >
          <FormLoader illust={illust}>{children}</FormLoader>
        </React.Suspense>
      </Dialog>
    </Modal>
  )
}
