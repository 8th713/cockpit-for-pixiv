export interface KeyDefinition {
  assignment: string
  description: string
  /** modifiers + key cap */
  title?: string
}

export const KEY_ASSIGNMENT: Record<string, KeyDefinition> = {
  goNextIllust: {
    assignment: 'j',
    description: '次の作品に移動',
  },
  goPrevIllust: {
    assignment: 'k',
    description: '前の作品に移動',
  },
  goNextRelatedIllust: {
    assignment: 'J',
    description: '表示中の作者の次の作品に移動',
    title: 'Shift+J',
  },
  goPrevRelatedIllust: {
    assignment: 'K',
    description: '表示中の作者の前の作品に移動',
    title: 'Shift+K',
  },
  goNextImage: {
    assignment: 'n',
    description: '次の画像に移動',
  },
  goPrevImage: {
    assignment: 'm',
    description: '前の画像に移動',
  },
  fullSizeMode: {
    assignment: 'v',
    description: 'フルサイズモード',
  },
  info: {
    assignment: 'i',
    description: '情報欄までスクロール',
  },
  like: {
    assignment: 'l',
    description: 'いいね！',
  },
  bookmark: {
    assignment: 'b',
    description: 'ブックマーク',
  },
  bookmarkPrivate: {
    assignment: 'B',
    description: '非公開ブックマーク',
    title: 'Shift+B',
  },
  openBookmarkForm: {
    assignment: 'Control+b',
    description: 'ブックマークフォーム表示',
    title: 'Control+B',
  },
  download: {
    assignment: 'd',
    description: 'ダウンロード',
  },
  share: {
    assignment: 't',
    description: 'Twitterでシェア',
  },
  follow: {
    assignment: 'f',
    description: 'フォロー',
  },
  followPrivate: {
    assignment: 'F',
    description: '非公開フォロー',
    title: 'Shift+F',
  },
  profile: {
    assignment: 'p',
    description: 'プロフィール',
  },
  help: {
    assignment: '?',
    description: 'ヘルプ',
  },
}

/**
 * Return button title from Key definition
 * @example
 * ```ts
 * console.log(toButtonTitle({
 *   assignment: 'B',
 *   description: '非公開ブックマーク',
 *   title: 'Shift+B',
 * }))
 * // "非公開ブックマーク(Shift+B)"
 * ```
 */
export function toButtonTitle({
  assignment,
  description,
  title,
}: KeyDefinition) {
  return `${description}(${title || assignment.toUpperCase()})`
}
