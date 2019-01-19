import React from 'react'
import styled from 'styled-components'
import { BookmarkForm, BookmarkPost } from '../../interfaces'
import { useInput, useRestrict } from '../../hooks'
import { RestrictField } from './RestrictField'
import { CommentField } from './CommentField'
import { Tags } from './Tags'
import { splitTag, toggleTag } from './utils'

type Props = {
  id: string
  data: BookmarkForm
  onSubmit: (post: BookmarkPost) => void
  children?: never
}

export function Form(props: Props) {
  const restrict = useRestrict(!!props.data.restrict)
  const comment = useInput(props.data.comment)
  const tags = useInput(props.data.tags)
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    props.onSubmit({
      restrict: restrict.checked,
      comment: comment.value.trim(),
      tags: splitTag(tags.value.trim())
    })
  }
  function handleTagging(tag: string) {
    tags.set(prev => toggleTag(prev, tag))
  }

  return (
    <Layout id={props.id} onSubmit={handleSubmit}>
      <RestrictField {...restrict.bind} />
      <CommentField {...comment.bind} />
      <Tags {...tags.bind} onTagging={handleTagging} />
    </Layout>
  )
}

const Layout = styled.form`
  display: grid;
  gap: 16px;
  margin-top: 8px;
`
