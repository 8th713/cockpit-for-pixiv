import { KEY_ASSIGNMENT, toButtonTitle } from '../../keyboardMap'
import { IconButton } from '../../shared/IconButton'
import { HelpIcon } from '../../shared/Icons'
import { useToggleAbout } from '../About/useAbout'

const title = toButtonTitle(KEY_ASSIGNMENT.help)

export function AboutButton() {
  const toggle = useToggleAbout()

  return (
    <IconButton type="button" onClick={() => toggle(true)} title={title}>
      <HelpIcon />
    </IconButton>
  )
}
