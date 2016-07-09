const { pixiv } = window

function toFormData(data) {
  if (data instanceof HTMLFormElement) {
    return new FormData(data)
  }

  const formData = new FormData()
  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }
  return formData
}

function createError(res) {
  const error = new Error(`${res.status}: ${res.statusText}`)
  error.response = res
  return error
}

function handleError(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  throw createError(res)
}

function toJson(res) {
  return res.json()
}

function fetchDoc(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'document'
    xhr.addEventListener('load', () => {
      handleError(xhr)
      resolve(xhr.response)
    })
    xhr.addEventListener('abort', () => reject(createError(xhr)))
    xhr.addEventListener('error', () => reject(createError(xhr)))
    xhr.addEventListener('timeout', () => reject(createError(xhr)))
    xhr.send()
  })
}

export function validate({ error, message }) {
  if (error) {
    throw new Error(message)
  }
}

// Single image API
export function fetchImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.addEventListener('load', () =>
      resolve(img)
    )
    img.addEventListener('error', () =>
      reject(new Error("Can't load image"))
    )
    img.src = src
  })
}

// Single page API
export function fetchPage(id) {
  return fetchDoc(`/member_illust.php?mode=medium&illust_id=${id}`)
}

// Single page API
export function fetchForm(id) {
  return fetchDoc(`/bookmark_add.php?type=illust&illust_id=${id}`)
}

// Single illust API
export function fetchIllust(id) {
  const url = `/rpc/index.php?mode=get_illust_detail_by_ids&illust_ids=${id}`
  const init = {
    credentials: 'same-origin'
  }

  return fetch(url, init).then(handleError).then(toJson)
}

// Star an illust
export function voteTo(id) {
  // pixiv.api.illust.rate
  const url = '/rpc_rating.php'
  const init = {
    method: 'post',
    credentials: 'same-origin',
    body: toFormData({
      mode: 'save',
      i_id: id,
      score: 10,
      tt: pixiv.context.token
    })
  }

  return fetch(url, init).then(handleError).then(toJson)
}

// Bookmark an illust
export function bookmark(id, body) {
  // pixiv.api.illust.bookmark
  const url = '/rpc/index.php'
  const init = {
    method: 'post',
    credentials: 'same-origin',
    body: toFormData(Object.assign(body, {
      mode: 'save_illust_bookmark',
      illust_id: id,
      tt: pixiv.context.token
    }))
  }

  return fetch(url, init).then(handleError).then(toJson)
}
