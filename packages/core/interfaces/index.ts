export * from './addons'
export * from './resources'

export type Dimension = {
  width: number
  height: number
}

export interface GlobalData {
  token: string
  userId: string
}

export interface ResourceInputs {
  id: string
  ac: AbortController
}

/**
 * The post data for bookmarks.
 */
export interface BookmarkPost {
  restrict?: boolean
  comment?: string
  tags?: string[]
}

/**
 * Converted AccountTagList.
 */
export type Tag = {
  name: string
  lev: number
  total: number
}

/**
 * Zip loader Result Object.
 */
export type Frame = {
  image: HTMLImageElement
  delay: number
  file: string
}

export type KeyDefinition = {
  keyName: string
  children: string
  title?: string
}
