export const keyMap = {
  goNext: { keyName: 'j', children: '次の作品に移動' },
  goPrev: { keyName: 'k', children: '前の作品に移動' },
  fit: { keyName: 'v', children: '縮尺モード切り替え' },
  spread: { keyName: 'h', children: '見開きモード切り替え' },
  info: { keyName: 'i', children: '情報欄表示切り替え' },
  like: { keyName: 'l', children: 'いいね！' },
  bookmark: { keyName: 'b', children: 'ブックマーク' },
  privateBookmark: { keyName: '⇧b', children: '非公開ブックマーク' },
  openBookmark: { keyName: '^b', children: 'ブックマークフォーム表示' },
  download: { keyName: 'd', children: 'ダウンロード' },
  share: { keyName: 't', children: 'Twitterでシェア' },
  follow: { keyName: 'f', children: 'フォロー' },
  privateFollow: { keyName: '⇧f', children: '非公開フォロー' },
  help: { keyName: '?', children: 'ヘルプ' }
}

export function getDesc(prop: keyof typeof keyMap) {
  const node = keyMap[prop]

  return `${node.children}(${node.keyName.toUpperCase()})`
}
