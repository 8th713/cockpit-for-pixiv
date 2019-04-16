import React from 'react'
import styled from 'styled-components'
import { useCheckbox, useInput } from '../../hooks'
import { BookmarkForm, BookmarkPost, Illust } from '../../interfaces'
import { CommentField } from './CommentField'
import { RestrictField } from './RestrictField'
import { Tags } from './Tags'
import { splitTag, toggleTag } from './utils'

type Props = {
  id: string
  illust: Illust
  data: BookmarkForm
  onSubmit: (post: BookmarkPost) => void
  children?: never
}

export function Form(props: Props) {
  const restrict = useCheckbox(!!props.data.restrict)
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
      <RestrictField {...restrict.inputProps} />
      <CommentField {...comment.inputProps} />
      <Tags
        illust={props.illust}
        userTags={props.data.userTags}
        {...tags.inputProps}
        onTagging={handleTagging}
      />
    </Layout>
  )
}

const Layout = styled.form`
  display: grid;
  gap: 16px;
  margin-top: 8px;
`
