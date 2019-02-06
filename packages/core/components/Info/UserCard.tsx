import React from 'react'
import { IllustProvider } from '../../contexts'
import { Author } from '../Author'
import { Progress } from '../shared/Progress'

export function UserCard() {
  const { read } = IllustProvider.useValue()
  const illust = read()

  if (!illust) {
    return null
  }
  return (
    <React.Suspense fallback={<Progress size={64} />}>
      <Author userId={illust.userId} />
    </React.Suspense>
  )
}
