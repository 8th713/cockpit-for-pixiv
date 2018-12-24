import React from 'react'
import { AsyncStatus } from '../../interfaces'
import { IllustProvider } from '../../contexts'
import { Author } from '../Author'
import { Progress } from '../shared/Progress'

export const UserCard = React.memo(function UserCard() {
  const result = IllustProvider.useValue()

  switch (result.status) {
    case AsyncStatus.Loading:
    case AsyncStatus.Failure:
      return <Progress size={64} />
    case AsyncStatus.Success: {
      const { value } = result

      return <Author userId={value.userId} />
    }
  }
})
