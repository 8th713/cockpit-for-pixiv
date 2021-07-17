import { KEY_ASSIGNMENT } from '../../../keyboardMap'
import { Hotkey } from '../../../shared/Hotkey'
import { styled } from '../../../stitches.config'
import {
  useIsInViewBottomAnchor,
  useScrollBottomAnchor,
} from '../../Info/infoState'
import {
  useIsFullSize,
  useItems,
  useSelected,
  useSetIsFullSize,
} from '../previewState'
import { Cover } from './Cover'

export function ScrollNavigation() {
  const isFullSize = useIsFullSize()
  const fullSize = useSetIsFullSize()
  const isInViewBottomAnchor = useIsInViewBottomAnchor()
  const scrollToBottom = useScrollBottomAnchor()
  const items = useItems()
  const [selected, select] = useSelected()
  const idx = items.findIndex((element) => element === selected)

  const isFirst = idx < 1
  const scrollTo = (idx: number) => {
    const element = items[idx]

    if (element) {
      select(element)
      element.scrollIntoView({ behavior: 'smooth' })
    }
    return !!element
  }
  const goToPreviousImage = () => {
    if (isInViewBottomAnchor()) {
      scrollTo(items.length - 1)
      return
    }
    if (!scrollTo(idx - 1)) {
      scrollTo(0)
    }
  }
  const goToNextImage = () => {
    if (!scrollTo(idx + 1)) {
      fullSize.off()
      scrollToBottom()
    }
  }

  return (
    <>
      {items.length > 1 && (
        <Cover>
          {!isFirst && (
            <TransparentButton
              tabIndex={-1}
              onClick={goToPreviousImage}
              css={{
                top: 0,
                zIndex: 1,
                cursor:
                  'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Cpath%20d%3D%22M177%20159.7l136%20136c9.4%209.4%209.4%2024.6%200%2033.9l-22.6%2022.6c-9.4%209.4-24.6%209.4-33.9%200L160%20255.9l-96.4%2096.4c-9.4%209.4-24.6%209.4-33.9%200L7%20329.7c-9.4-9.4-9.4-24.6%200-33.9l136-136c9.4-9.5%2024.6-9.5%2034-.1z%22%20stroke-width%3D%2230%22%20stroke%3D%22%23000%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E") 15 15, pointer',
              }}
            />
          )}
          <TransparentButton
            tabIndex={-1}
            onClick={goToNextImage}
            css={{
              top: isFullSize ? '80vh' : 'calc(80vh - 56px)',
              cursor:
                'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Cpath%20d%3D%22M143%20352.3L7%20216.3c-9.4-9.4-9.4-24.6%200-33.9l22.6-22.6c9.4-9.4%2024.6-9.4%2033.9%200l96.4%2096.4%2096.4-96.4c9.4-9.4%2024.6-9.4%2033.9%200l22.6%2022.6c9.4%209.4%209.4%2024.6%200%2033.9l-136%20136c-9.2%209.4-24.4%209.4-33.8%200z%22%20stroke-width%3D%2230%22%20stroke%3D%22%23000%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E") 15 15, pointer',
            }}
          />
        </Cover>
      )}
      <Hotkey {...KEY_ASSIGNMENT.goPrevImage} onKeydown={goToPreviousImage} />
      <Hotkey {...KEY_ASSIGNMENT.goNextImage} onKeydown={goToNextImage} />
    </>
  )
}

const TransparentButton = styled('button', {
  appearance: 'none',
  pointerEvents: 'auto',
  boxSizing: 'border-box',
  position: 'sticky',
  width: '100%',
  height: '20vh',
  margin: 0,
  padding: 0,
  borderWidth: 0,
  opacity: 0,
  backgroundColor: 'transparent',
})

if (__DEV__) {
  TransparentButton.displayName = 'PreviewControl.TransparentButton'
}
