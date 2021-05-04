import { memo } from 'react'
import { PageCount } from './PageCount'
import { ScrollNavigation } from './ScrollNavigation'
import { WorkNavigation } from './WorkNavigation'

export const PreviewControl = memo(() => {
  return (
    <>
      <PageCount />
      <ScrollNavigation />
      <WorkNavigation />
    </>
  )
})
