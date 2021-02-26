import { useEffect } from 'react'
import { Modal } from '../../shared/Modal'
import { Info } from '../Info/Info'
import { Preview } from '../Preview/Preview'
import { useNavigate, useRouteId } from './routerState'
import { ensureAnchorElement, hasThumbnail } from './utils'

export interface RouterProps {}

export const Router = (_: RouterProps) => {
  const nav = useNavigate()
  const id = useRouteId()
  const isOpen = Boolean(id)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = ensureAnchorElement(event.target as Element)

      if (!target) return
      if (!hasThumbnail(target)) return

      event.preventDefault()
      nav.setByElement(target)
    }
    const handleMouseOver = (event: MouseEvent) => {
      const target = ensureAnchorElement(event.target as Element)

      if (!target) return
      if (target.style.cursor === 'zoom-in') return
      if (!hasThumbnail(target)) return

      target.style.cursor = 'zoom-in'
    }

    document.body.addEventListener('click', handleClick)
    document.body.addEventListener('mouseover', handleMouseOver)
    return () => {
      document.body.removeEventListener('click', handleClick)
      document.body.removeEventListener('mouseover', handleMouseOver)
    }
  }, [nav])

  return (
    <Modal open={isOpen} onClose={nav.unset}>
      <Preview id={id!}>
        <Info id={id!} />
      </Preview>
    </Modal>
  )
}
