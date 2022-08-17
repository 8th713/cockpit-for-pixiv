import { useEffect } from 'react'
import type { Navigate } from './useNavigate'
import { ensureTargetElement, hasThumbnail } from './utils'

export function useAttachGlobalEvents(navigate: Navigate) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = ensureTargetElement(event.target as Element)

      if (!target) return
      if (!hasThumbnail(target)) return

      event.preventDefault()
      navigate(target)
    }
    const handleMouseOver = (event: MouseEvent) => {
      const target = ensureTargetElement(event.target as Element)

      if (!target) return
      if (target.style.cursor === 'zoom-in') return
      if (!hasThumbnail(target)) return

      target.style.cursor = 'zoom-in'
    }

    document.body.addEventListener('click', handleClick, true)
    document.body.addEventListener('mouseover', handleMouseOver)
    return () => {
      document.body.removeEventListener('click', handleClick, true)
      document.body.removeEventListener('mouseover', handleMouseOver)
    }
  }, [navigate])
}
