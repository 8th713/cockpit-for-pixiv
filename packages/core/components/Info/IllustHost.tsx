import React, { useContext } from 'react'
import { useServices } from '../Services'
import { Illust } from '../../interfaces'

type Props = {
  id: string
  children?: React.ReactNode
}

const NO_PROVIDER = 'Missing IllustHost'
const CacheContext = React.createContext<
  | {
      input: string
      read: () => Illust | null
      remove: () => void
      replace: (value: Illust | null) => void
      reload: (alt?: Illust | null) => void
    }
  | typeof NO_PROVIDER
>(NO_PROVIDER)

export function useIllust() {
  const value = useContext(CacheContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function IllustHost({ id, children }: Props) {
  const { apiClient } = useServices()
  return (
    <CacheContext.Provider value={apiClient.useIllust(id)}>
      {children}
    </CacheContext.Provider>
  )
}

export function like(illust: Illust): Illust {
  const likeCount = illust.likeCount + 1
  return { ...illust, likeCount, likeData: true }
}

export function bookmark(illust: Illust, restrict: boolean): Illust {
  const bookmarkCount = illust.bookmarkData
    ? illust.bookmarkCount
    : illust.bookmarkCount + 1
  const bookmarkData = illust.bookmarkData
    ? illust.bookmarkData
    : { id: '', private: restrict }
  return { ...illust, bookmarkCount, bookmarkData }
}
