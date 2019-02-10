import React from 'react'
import { useUserTags, useSort } from '../hooks'

export type UserTagsContextValue = UserTags & Sort

type UserTags = ReturnType<typeof useUserTags>
type Sort = ReturnType<typeof useSort>
type Props = {
  children?: React.ReactNode
}

const Context = React.createContext<UserTagsContextValue>(null as any)

export function UserTagsProvider(props: Props) {
  const userTags = useUserTags()
  const sort = useSort()

  return (
    <Context.Provider value={{ ...userTags, ...sort }}>
      {props.children}
    </Context.Provider>
  )
}
UserTagsProvider.Context = Context
