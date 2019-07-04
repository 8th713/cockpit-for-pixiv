import React, { useState } from 'react'
import { BookmarkForm, Illust } from '../../interfaces'
import { bookmark } from '../Info/utils'
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
  const { apiClient } = useServices()
  const { replace, reload } = apiClient.useIllust()
  const setOepn = useUpdateToggleForm()
  const [state, setState] = useState({
    restrict: !!data.restrict,
    comment: data.comment,
    tags: data.tags
  })
  const [disabled, setDisabled] = useState(false)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    replace(illust.id, bookmark(illust, state.restrict))
    setOepn(false)
    apiClient
      .bookmarkBy(illust.id, toPostData(state))
      .then(() => reload(illust.id), () => replace(illust.id, illust))
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
              illustTags={illust.tags.tags}
              userTags={data.userTags}
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
