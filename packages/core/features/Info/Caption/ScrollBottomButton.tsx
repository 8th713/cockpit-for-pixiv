import React from 'react'
import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { ScrollBottomIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { useSetIsFullSize } from '../../Preview/previewState'
import { useBottomAnchor } from '../infoState'

export interface ScrollBottomButtonProps {}

const title = getHotkeyHint(KEY_ASSIGNMENT.info)

export const ScrollBottomButton = (_: ScrollBottomButtonProps) => {
  const bottomElementRef = useBottomAnchor()
  const fullSize = useSetIsFullSize()
  const scrollBottom = () => {
    if (bottomElementRef.current) {
      fullSize.off()
      bottomElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <IconButton type="button" title={title} onClick={scrollBottom}>
      <ScrollBottomIcon />
      <Hotkey {...KEY_ASSIGNMENT.info} onKeydown={scrollBottom} />
    </IconButton>
  )
}
