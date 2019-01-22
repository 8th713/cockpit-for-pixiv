import React from 'react'
import { IllustProvider } from '../../contexts'
import { Author } from '../Author'
import { Progress } from '../shared/Progress'

export function UserCard() {
  const { read } = IllustProvider.useValue()

  try {
    const illust = read()
    return (
      <React.Suspense fallback={<Progress size={64} />}>
        <Author userId={illust.userId} />
      </React.Suspense>
    )
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return <Progress size={64} />
  }
}
