import React from 'react'
import { useBookmarkForm } from '../../hooks'
import { BookmarkPost, Illust } from '../../interfaces'
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
  const formData = read()

  if (!formData) {
    return <div onClick={retry}>取得できませんでした</div>
  }

  return <Form {...props} data={formData} />
}
