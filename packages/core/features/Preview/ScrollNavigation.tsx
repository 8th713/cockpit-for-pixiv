import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Hotkey } from '../../shared/Hotkey'
import { styled } from '../../stitches.config'
import { useFullscreen } from '../App/useFullscreen'
import { Backdrop } from './Backdrop'
import { useNodeList } from './useNodeList'
import { useCurrentElement } from './useScrollObserver'

export function ScrollNavigation() {
  return (
    <Backdrop fit>
      <ScrollPreviousButton />
      <ScrollNextButton />
    </Backdrop>
  )
}

function ScrollPreviousButton() {
  const [isFullscreen] = useFullscreen()
  const nodes = useNodeList()
  const element = useCurrentElement()
  const handler = (e: Event | React.SyntheticEvent) => {
    e.stopPropagation()

    const sentinel = document.getElementById('cfp-bottom-anchor')!

    if (isInView(sentinel) && !isFullscreen) {
      element?.scrollIntoView()
    } else {
      element?.previousElementSibling?.scrollIntoView()
    }
  }

  if (nodes.size < 2 || !element) return null
  if (nodes.get(element) === 0) return null

  return (
    <>
      <ScrollButton position="top" onClick={handler} />
      <Hotkey {...KEY_ASSIGNMENT.goPrevImage} onKeydown={handler} />
    </>
  )
}

function ScrollNextButton() {
  const [isFullscreen, updateFullscreen] = useFullscreen()
  const nodes = useNodeList()
  const element = useCurrentElement()
  const handler = (e: Event | React.SyntheticEvent) => {
    e.stopPropagation()

    const nextElement = element?.nextElementSibling

    if (nodes.has(nextElement!)) {
      nextElement?.scrollIntoView()
    } else {
      const sentinel = document.getElementById('cfp-bottom-anchor')!

      updateFullscreen(false)
      sentinel.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (nodes.size < 2 || !element) return null

  return (
    <>
      <ScrollButton
        position="bottom"
        fullscreen={isFullscreen}
        onClick={handler}
      />
      <Hotkey {...KEY_ASSIGNMENT.goNextImage} onKeydown={handler} />
    </>
  )
}

const ScrollButton = styled('button', {
  appearance: 'none',
  pointerEvents: 'auto',
  boxSizing: 'border-box',
  position: 'sticky',
  width: '100%',
  height: '20vh',
  margin: 0,
  padding: 0,
  borderWidth: 0,
  backgroundColor: 'transparent',
  opacity: 0,
  variants: {
    position: {
      top: {
        top: 0,
        zIndex: 1,
        cursor:
          'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Cpath%20d%3D%22M177%20159.7l136%20136c9.4%209.4%209.4%2024.6%200%2033.9l-22.6%2022.6c-9.4%209.4-24.6%209.4-33.9%200L160%20255.9l-96.4%2096.4c-9.4%209.4-24.6%209.4-33.9%200L7%20329.7c-9.4-9.4-9.4-24.6%200-33.9l136-136c9.4-9.5%2024.6-9.5%2034-.1z%22%20stroke-width%3D%2230%22%20stroke%3D%22%23000%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E") 15 15, pointer',
      },
      bottom: {
        top: 'calc(80vh - $sizes$md)',
        cursor:
          'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%20width%3D%2230%22%20height%3D%2230%22%3E%3Cpath%20d%3D%22M143%20352.3L7%20216.3c-9.4-9.4-9.4-24.6%200-33.9l22.6-22.6c9.4-9.4%2024.6-9.4%2033.9%200l96.4%2096.4%2096.4-96.4c9.4-9.4%2024.6-9.4%2033.9%200l22.6%2022.6c9.4%209.4%209.4%2024.6%200%2033.9l-136%20136c-9.2%209.4-24.4%209.4-33.8%200z%22%20stroke-width%3D%2230%22%20stroke%3D%22%23000%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E") 15 15, pointer',
      },
    },
    fullscreen: {
      true: {
        top: '80vh',
      },
    },
  },
})

function isInView(element: HTMLElement) {
  const rect = element.getBoundingClientRect()

  return rect.top < window.innerHeight - 56
}
