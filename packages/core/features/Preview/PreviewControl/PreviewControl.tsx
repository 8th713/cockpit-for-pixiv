import { memo } from 'react'
import { KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { useSetIsFullSize } from '../previewState'
import { PageCount } from './PageCount'
import { ScrollNavigation } from './ScrollNavigation'
import { WorkNavigation } from './WorkNavigation'

export const PreviewControl = memo(() => {
  const { toggle } = useSetIsFullSize()

  return (
    <>
      <PageCount />
      <ScrollNavigation />
      <WorkNavigation />
      <Hotkey {...KEY_ASSIGNMENT.fullSizeMode} onKeydown={toggle} />
    </>
  )
})
