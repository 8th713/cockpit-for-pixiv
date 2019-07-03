import React, { useContext } from 'react'
import { BookmarkForm, Illust } from '../../interfaces'
import { useServices } from '../Services'

type Props = {
  illust: Illust
  children?: React.ReactNode
}

const NO_PROVIDER = 'Missing FormHost'
const CacheContext = React.createContext<
  | {
      illust: Illust
      input: string
      read: () => BookmarkForm | null
      remove: () => void
      replace: (value: BookmarkForm | null) => void
      reload: (alt?: BookmarkForm | null) => void
    }
  | typeof NO_PROVIDER
>(NO_PROVIDER)

export function useForm() {
  const value = useContext(CacheContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function FormHost({ illust, children }: Props) {
  const { apiClient } = useServices()
  const cache = apiClient.useBookmarkForm(illust.id)
  const value = { ...cache, illust }

  return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
}
