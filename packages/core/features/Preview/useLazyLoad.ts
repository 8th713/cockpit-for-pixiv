export function lazyLoad(element: Element) {
  const img = element.firstElementChild as HTMLImageElement

  if (img.loading === 'eager') return
  if (img.complete) {
    img.loading === 'eager'
    return
  }

  const root = document.getElementById('cfp-scrollable')
  const io = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        img.loading = 'eager'
        observer.disconnect()
      }
    },
    { root, rootMargin: '40%' }
  )

  io.observe(element)
  return () => {
    io.disconnect()
  }
}
