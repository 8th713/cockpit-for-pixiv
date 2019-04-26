import React from 'react'
import { useIllustContext } from '../../hooks'
import { Author } from '../Author'
import { Progress } from '../shared/Progress'

export function UserCard() {
  const { read } = useIllustContext()
  const illust = read()

  if (!illust) return null

  return (
    <React.Suspense fallback={<Progress size={64} />}>
      <Author userId={illust.userId} />
    </React.Suspense>
  )
}
