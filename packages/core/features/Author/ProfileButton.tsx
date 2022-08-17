import { toButtonTitle, KEY_ASSIGNMENT } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { ProfileIcon } from '../../shared/Icons'
import { IconButton } from '../../shared/IconButton'
import { Modal } from '../../shared/Modal'
import { useToggle } from '../../shared/useToggle'
import { Profile } from './Profile'

export interface ProfileButtonProps {
  user?: Pixiv.User
}

const title = toButtonTitle(KEY_ASSIGNMENT.profile)

export function ProfileButton({ user }: ProfileButtonProps) {
  const [isOpened, toggle] = useToggle()
  const disabled = !user

  return (
    <>
      <IconButton
        type="button"
        title={title}
        onClick={() => toggle(true)}
        disabled={disabled}
      >
        <ProfileIcon />
      </IconButton>
      <Modal open={isOpened} onClose={() => toggle(false)}>
        <Profile user={user!} />
      </Modal>
      <Hotkey
        {...KEY_ASSIGNMENT.profile}
        onKeydown={() => toggle()}
        disabled={disabled}
      />
    </>
  )
}
