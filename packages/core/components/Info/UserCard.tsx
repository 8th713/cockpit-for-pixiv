import React, { useContext } from 'react'
import { IllustContext } from '../../contexts'
import { Author } from '../Author'
import { Progress } from '../shared/Progress'

export function UserCard() {
  const { read } = useContext(IllustContext)
  const illust = read()

  if (!illust) return null

  return (
    <React.Suspense fallback={<Progress size={64} />}>
      <Author userId={illust.userId} />
    </React.Suspense>
  )
}
