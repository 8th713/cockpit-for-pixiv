export const LABEL = `${GM_info.script.name} - ${GM_info.script.version}`
export const NO_SCROLLBAR = 'no-scrollbar'
export const INCLUDES = CP_SELECTORS.INCLUDES.join()
export const EXCLUDES = CP_SELECTORS.EXCLUDES.join()
export const KEY_ASSIGNMENT = {
  goNextIllust: {
    keyName: 'j',
    children: '次の作品に移動'
  },
  goPrevIllust: {
    keyName: 'k',
    children: '前の作品に移動'
  },
  goNextRelatedIllust: {
    keyName: 'J',
    children: '表示中の作者の次の作品に移動',
    title: 'Shift+J'
  },
  goPrevRelatedIllust: {
    keyName: 'K',
    children: '表示中の作者の前の作品に移動',
    title: 'Shift+K'
  },
  goNextImage: {
    keyName: 'n',
    children: '次の画像に移動'
  },
  goPrevImage: {
    keyName: 'm',
    children: '前の画像に移動'
  },
  fullSizeMode: {
    keyName: 'v',
    children: 'フルサイズモード'
  },
  info: {
    keyName: 'i',
    children: '情報欄までスクロール'
  },
  like: {
    keyName: 'l',
    children: 'いいね！'
  },
  bookmark: {
    keyName: 'b',
    children: 'ブックマーク'
  },
  bookmarkPrivate: {
    keyName: 'B',
    children: '非公開ブックマーク',
    title: 'Shift+B'
  },
  openBookmarkForm: {
    keyName: 'Control+b',
    children: 'ブックマークフォーム表示',
    title: 'Control+B'
  },
  download: {
    keyName: 'd',
    children: 'ダウンロード'
  },
  share: {
    keyName: 't',
    children: 'Twitterでシェア'
  },
  follow: {
    keyName: 'f',
    children: 'フォロー'
  },
  followPrivate: {
    keyName: 'F',
    children: '非公開フォロー',
    title: 'Shift+F'
  },
  help: {
    keyName: '?',
    children: 'ヘルプ'
  }
}
