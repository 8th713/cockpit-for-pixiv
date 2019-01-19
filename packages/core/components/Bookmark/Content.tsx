import React from 'react'
import { AsyncStatus, BookmarkPost } from '../../interfaces'
import { useBookmarkForm } from '../../hooks'
import { PickerProvider } from '../../contexts'
import { Progress } from '../shared/Progress'
import { Form } from './Form'

type Props = {
  id: string
  onSubmit: (post: BookmarkPost) => void
  children?: never
}

export function Content(props: Props) {
  const illustId = PickerProvider.useValue()!
  const { result, retry } = useBookmarkForm(illustId)

  switch (result.status) {
    case AsyncStatus.Loading: {
      return (
        <div>
          <Progress />
        </div>
      )
    }
    case AsyncStatus.Success: {
      const { value } = result

      return <Form {...props} data={value} />
    }
    case AsyncStatus.Failure: {
      return <div onClick={retry}>取得できませんでした</div>
    }
  }
}
