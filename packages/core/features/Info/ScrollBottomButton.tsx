import { KEY_ASSIGNMENT, toButtonTitle } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { IconButton } from '../../shared/IconButton'
import { ScrollBottomIcon } from '../../shared/Icons'
import { useUpdateFullscreen } from '../App/useFullscreen'

export interface ScrollBottomButtonProps {}

const title = toButtonTitle(KEY_ASSIGNMENT.info)

export function ScrollBottomButton(_: ScrollBottomButtonProps) {
  const updateFullscreen = useUpdateFullscreen()
  const scrollBottom = () => {
    updateFullscreen(false)
    document.getElementById('cfp-bottom-anchor')?.scrollIntoView()
  }

  return (
    <IconButton type="button" title={title} onClick={scrollBottom}>
      <ScrollBottomIcon />
      <Hotkey {...KEY_ASSIGNMENT.info} onKeydown={scrollBottom} />
    </IconButton>
  )
}
