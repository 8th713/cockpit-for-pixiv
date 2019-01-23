import React from 'react'
import { useUserTags, useSort } from '../hooks'

type UserTags = ReturnType<typeof useUserTags>
type Sort = ReturnType<typeof useSort>

const UserTagsContext = React.createContext<UserTags & Sort>(null as any)

function useValue() {
  return React.useContext(UserTagsContext)
}

type Props = {
  children?: React.ReactNode
}

function UserTagsProvider(props: Props) {
  const userTags = useUserTags()
  const sort = useSort()

  return (
    <UserTagsContext.Provider value={{ ...userTags, ...sort }}>
      {props.children}
    </UserTagsContext.Provider>
  )
}

const Context = Object.assign(UserTagsProvider, { useValue })

export { Context as UserTagsProvider }
