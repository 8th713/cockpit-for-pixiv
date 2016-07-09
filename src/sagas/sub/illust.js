import { call } from 'redux-saga/effects'
import camelize from 'camelize'
import timm from '../../utils/timm'
import * as api from '../../utils/api'

const normalizer = {
  ugoira(illust) {
    const ugoira = JSON.parse(illust.ugoiraMetaFullscreen)

    ugoira.src = illust.url.ugoira600x600.replace('600x600', '1920x1080')
    ugoira.width = illust.illustWidth
    ugoira.height = illust.illustHeight

    return [timm(illust)
      .merge({ ugoira })
      .omit(['ugoiraMeta', 'ugoiraMetaFullscreen'])
      .value(), {}]
  },
  multiple(illust) {
    const images = {}
    const children = []
    const {
      illustTitle: title,
      illustPageCount: count,
      url: { big: url }
    } = illust

    for (let i = 0; i < count; i++) {
      const src = url.replace('_p0', `_p${i}`)
      images[src] = { src, alt: `${title}(${i + 1}-${count})` }
      children.push(src)
    }

    return [
      timm.set(illust, 'images', children),
      images
    ]
  },
  single(illust) {
    const images = {}
    const children = [illust.url.big]
    images[illust.url.big] = {
      src: illust.url.big,
      alt: illust.illustTitle
    }

    return [
      timm.set(illust, 'images', children),
      images
    ]
  }
}

function normalize(illust) {
  if (!illust) {
    throw new Error('存在しない作品です')
  }
  if (illust.error) {
    throw new Error('データに異常があります')
  }

  if (illust.ugoiraMeta) {
    return normalizer.ugoira(illust)
  }

  if (illust.isMultiple) {
    return normalizer.multiple(illust)
  }

  return normalizer.single(illust)
}

export default function* fetchIllust(id) {
  const result = yield call(api.fetchIllust, id)
  api.validate(result)
  const { body } = result
  const [illust, images] = normalize(camelize(body[id]))
  return [illust, images]
}
