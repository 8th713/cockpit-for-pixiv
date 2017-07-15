type Dict<T> = {
  [key: string]: T
}

type Dimensions = {
  width: number,
  height: number,
}

type IllustSource = {
  // 種別[イラスト,小説]
  +contentType: 'illust' | 'novel',
  +error: boolean,
  // 綴じ方向[無,右,左]
  +illustBookStyle: '0' | '1' | '2',
  // 拡張子
  +illustExt: string,
  // 高さ[一枚目のみ]
  +illustHeight: string,
  // 識別子
  +illustId: string,
  // 枚数
  +illustPageCount: string,
  // 公開範囲[公開,マイピク,非公開]
  +illustRestrict: '0' | '1' | '2',
  // 健全性
  +illustSanitylevel: number,
  // タイトル
  +illustTitle: string,
  // イラストの種類[画像,漫画,動画]
  +illustType: '0' | '1' | '2',
  // 幅[一枚目のみ]
  +illustWidth: string,
  // 18禁[規制内,R-18,R-18G]
  +illustXRestrict: '0' | '1' | '2',
  // ブックマーク
  +isBookmarked: boolean,
  // コメント
  +isCommented: boolean,
  // 複数枚
  +isMultiple: boolean,
  // いいね！
  +isRated: boolean,
  // アバター
  +profileImg: string,
  // 縮小サイズうごイラメタデータ[600x600][JSON string]
  +ugoiraMeta: string,
  // フルサイズうごイラメタデータ[JSON string]
  +ugoiraMetaFullscreen: string,
  // URLs
  +url: {
    // サムネイル URL[240x480]
    +'240mw': string,
    // オリジナル URL
    +big: string,
    // モバイル URL[600x600]
    +m: string,
    // 縮小サイズうごイラ URL[600x600]
    +ugoira600x600: string,
  },
  // 投稿者名
  +userName: string,
  // 投稿者識別子
  +userId: string,
}

type ImageSource = {
  src: string,
  alt: string,
}

type UgoiraFrame = {
  file: string,
  delay: number,
}

type UgoiraSource = {
  src: string,
  mime_type: string,
  frames: UgoiraFrame[],
  width: number,
  height: number,
}

type TagSource = {
  lev: number;
  total: number;
}

type IllustTag = {
  name: string;
  url: string;
}

type DetailSource = {
  date: string,
  viewCount: number,
  rateCount: number,
  caption: string,
  tags: IllustTag[],
}

type BookmarkSource = {
  restrict: number,
  comment: string,
  tags: string,
}
