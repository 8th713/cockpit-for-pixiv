import React from 'react'
import { BookmarkPost, Illust } from '../../interfaces'
import { useBookmarkForm } from '../../hooks'
import { Form } from './Form'

type Props = {
  id: string
  illust: Illust
  onSubmit: (post: BookmarkPost) => void
  children?: never
}

export function Content(props: Props) {
  const illustId = props.illust.illustId
  const { read, retry } = useBookmarkForm(illustId)

  try {
    const formData = read()

    return <Form {...props} data={formData} />
  } catch (error) {
    if (error && error.then) {
      throw error
    }
    return <div onClick={retry}>取得できませんでした</div>
  }
}
