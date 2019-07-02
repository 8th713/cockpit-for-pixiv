import React, { useState } from 'react'
import { BookmarkForm, Illust } from '../../interfaces'
import { bookmark, useIllust } from '../Info/IllustHost'
import { useServices } from '../Services'
import { Button } from '../shared/Button'
import { Comment } from './Comment'
import { FormMock } from './FormMock'
import { Restrict } from './Restrict'
import { SortHost } from './SortHost'
import { Tags } from './Tags'
import { useUpdateToggleForm } from './ToggleForm'
import { toPostData } from './utils'

type Props = {
  illust: Illust
  data: BookmarkForm
  children?: React.ReactNode
}

export function Form({ illust, data, children }: Props) {
  const { userTags } = data
  const {
    tags: { tags: illustTags }
  } = illust
  const { apiClient } = useServices()
  const { input: id, replace, reload } = useIllust()
  const setOepn = useUpdateToggleForm()
  const [state, setState] = useState({
    restrict: !!data.restrict,
    comment: data.comment,
    tags: data.tags
  })
  const [disabled, setDisabled] = useState(false)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (id !== illust.id) return
    replace(bookmark(illust, state.restrict))
    apiClient
      .bookmarkBy(illust.id, toPostData(state))
      .then(() => reload(), () => replace(illust))
      .finally(() => setOepn(false))
  }

  return (
    <FormMock
      onSubmit={handleSubmit}
      action={
        <Button
          kind="contained"
          color="primary"
          type="submit"
          disabled={disabled}
        >
          ブックマーク
        </Button>
      }
    >
      <FormMock.FlexContainer>
        {children}
        <div>
          <Restrict
            value={state.restrict}
            onChange={value => setState({ ...state, ...value })}
          />
          <Comment
            value={state.comment}
            onChange={value => setState({ ...state, ...value })}
          />
          <SortHost>
            <Tags
              illustTags={illustTags}
              userTags={userTags}
              value={state.tags}
              onChange={(value, valid) => {
                setState({ ...state, ...value })
                setDisabled(!valid)
              }}
            />
          </SortHost>
        </div>
      </FormMock.FlexContainer>
    </FormMock>
  )
}
