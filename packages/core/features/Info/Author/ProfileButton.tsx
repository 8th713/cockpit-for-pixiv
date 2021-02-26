import { getHotkeyHint, KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { ProfileIcon } from '../../../shared/Icon'
import { IconButton } from '../../../shared/IconButton'
import { Modal } from '../../../shared/Modal'
import { useToggle } from '../../../shared/useToggle'
import { AuthorQueryResult } from './authorQuery'
import { Profile } from './Profile'

export type ProfileButtonProps = AuthorQueryResult

const title = getHotkeyHint(KEY_ASSIGNMENT.profile)

export const ProfileButton = ({ data }: ProfileButtonProps) => {
  const { isOpen, open, close, toggle } = useToggle()

  return (
    <>
      <IconButton type="button" title={title} onClick={open} disabled={!data}>
        <ProfileIcon />
      </IconButton>
      <Modal open={isOpen} onClose={close}>
        <Profile {...data!} />
      </Modal>
      <Hotkey {...KEY_ASSIGNMENT.profile} onKeydown={toggle} disabled={!data} />
    </>
  )
}
