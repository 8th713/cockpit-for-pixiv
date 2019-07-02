export const LABEL = `${GM_info.script.name} - ${GM_info.script.version}`
export const NO_SCROLLBAR = 'no-scrollbar'
export const INCLUDES = CP_SELECTORS.INCLUDES.join()
export const EXCLUDES = CP_SELECTORS.EXCLUDES.join()
export const KEY_ASSIGNMENT = {
  goNextIllust: { keyName: 'j', children: '次の作品に移動' },
  goPrevIllust: { keyName: 'k', children: '前の作品に移動' },
  goNextImage: { keyName: 'n', children: '次の画像に移動' },
  goPrevImage: { keyName: 'm', children: '前の画像に移動' },
  fullSizeMode: { keyName: 'v', children: 'フルサイズモード' },
  info: { keyName: 'i', children: '情報欄表示' },
  like: { keyName: 'l', children: 'いいね！' },
  bookmark: { keyName: 'b', children: 'ブックマーク' },
  bookmarkPrivate: {
    keyName: '⇧b',
    children: '非公開ブックマーク',
    title: 'Shift + b'
  },
  openBookmarkForm: {
    keyName: '^b',
    children: 'ブックマークフォーム表示',
    title: 'Ctrl + b'
  },
  download: { keyName: 'd', children: 'ダウンロード' },
  share: { keyName: 't', children: 'Twitterでシェア' },
  follow: { keyName: 'f', children: 'フォロー' },
  followPrivate: {
    keyName: '⇧f',
    children: '非公開フォロー',
    title: 'Shift + f'
  },
  help: { keyName: '?', children: 'ヘルプ' }
}
