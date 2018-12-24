import { useState, useEffect } from 'react'
import { AsyncStatus } from '../interfaces'
import { useAbort, useStateRef } from '.'

export function useImg(src: string) {
  const [status, setStatus] = useState(AsyncStatus.Loading)
  const ac = useAbort()

  useEffect(() => {
    loadImg(src, ac.signal)
      .then(() => setStatus(AsyncStatus.Success))
      .catch(error => {
        if (error.message === 'abort') return
        setStatus(AsyncStatus.Failure)
      })
  }, [])

  return status
}

export function useLazyImg(
  src: string,
  entry: IntersectionObserverEntry | null
) {
  const [status, setStatus, getStatus] = useStateRef(AsyncStatus.Loading)
  const ac = useAbort()

  useEffect(
    () => {
      if (!entry || !entry.isIntersecting) return
      if (getStatus() === AsyncStatus.Success) return
      loadImg(src, ac.signal)
        .then(() => setStatus(AsyncStatus.Success))
        .catch(error => {
          if (error.message === 'abort') return
          setStatus(AsyncStatus.Failure)
        })
    },
    [entry]
  )

  return status
}

function loadImg(src: string, signal: AbortSignal) {
  return new Promise((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(src)
    i.onerror = () => reject(new Error('error'))
    i.src = src
    signal.onabort = () => reject(new Error('abort'))
  })
}
