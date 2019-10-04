// Follow https://material.io/design/motion/speed.html#duration
// to learn when use what timing.
export const duration = {
  // Complexity level
  simple: '100ms',
  complex: '200ms',
  detail: '500ms',
  // Area
  smallIn: '150ms',
  smallOut: '75ms',
  mediumIn: '250ms',
  mediumOut: '200ms',
  largeIn: '300ms',
  largeOut: '250ms'
} as const

// Follow https://material.io/design/motion/speed.html#easing
// to learn the context in which each easing should be used.
export const easing = {
  // Persistent element
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Incoming element
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  // Outgoing element
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)'
} as const

export interface TransitionOption {
  duration?: string
  easing?: string
  delay?: string
}

export const createTransition = (
  props: string | string[] = ['all'],
  {
    duration: durationOption = duration.simple,
    easing: easingOption = easing.standard,
    delay = '0ms'
  }: TransitionOption = {}
) =>
  (Array.isArray(props) ? props : [props])
    .map(prop => `${prop} ${durationOption} ${easingOption} ${delay}`)
    .join(',')
