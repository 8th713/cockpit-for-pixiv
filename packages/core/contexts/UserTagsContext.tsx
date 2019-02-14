import React from 'react'
import { useSort, useUserTags } from '../hooks'

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
UserTagsProvider.useContextValue = function useContextValue() {
  return React.useContext(Context)
}
