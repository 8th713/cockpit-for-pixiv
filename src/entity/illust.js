// @flow
import type Detail from './detail'
import type Bookmark from './bookmark'
import type Image from './image'
import type Ugoira from './ugoira'

const PROFILE = '/member_illust.php?mode=medium&illust_id='
const USER = '/member_illust.php?id='

export default class Illust {
  // Illust data
  id: string;
  title: string;
  href: string;
  thumbnail: string;

  // Author data
  userId: string;
  userName: string;
  userHref: string;
  avatar: string;

  detail: Detail;
  bookmark: Bookmark;
  images: Image[] | Ugoira[];

  constructor(
    detail: Detail,
    bookmark: Bookmark,
    images: Image[] | Ugoira[],
    src: IllustSource,
  ) {
    this.id = src.illustId
    this.title = src.illustTitle
    this.href = `${PROFILE}${this.id}`
    this.thumbnail = src.url['240mw']

    this.userId = src.userId
    this.userName = src.userName
    this.userHref = `${USER}${this.userId}`
    this.avatar = src.profileImg

    this.detail = detail
    this.bookmark = bookmark
    this.images = images
  }
}
