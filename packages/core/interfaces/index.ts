import { Resource } from '../externals/cache'
import * as Types from './resources'

export * from './addons'
export * from './enum'
export * from './async'
export * from './resources'

export type Dimension = {
  width: number
  height: number
}

export interface PixivGlobalData {
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

export interface Client {
  user: Resource<ResourceInputs, Types.User>
  illust: Resource<ResourceInputs, Types.Illust>
  pages: Resource<ResourceInputs, Types.Pages>
  ugoira: Resource<ResourceInputs, Types.Ugoira>
  bookmarkForm: Resource<ResourceInputs, Types.BookmarkForm>
  accountTags: Resource<AbortController, Tag[]>
  follow(userId: string, restrict: boolean): Promise<never[]>
  like(illustId: string): Promise<Types.LikeData>
  bookmark(illustId: string, data: BookmarkPost): Promise<Types.BookmarkData>
  isSelf(userId: string): boolean
}
