import { rest } from 'msw'
import { ArtWorks } from './data/artWorks'
import { Ugoiras } from './data/ugoira'
import { Works } from './data/works'

export const illustHandlers = [
  rest.get('/ajax/illust/:id', (req, res, ctx) => {
    const { id } = req.params
    const body = Works[id]

    if (body)
      return res(
        ctx.delay(1200),
        ctx.status(200),
        ctx.json({
          body,
          error: false,
          message: '',
        })
      )

    return res(
      ctx.delay(1200),
      ctx.status(404),
      ctx.json({
        body: null,
        error: true,
        message: 'リクエストされたページが見つかりませんでした',
      })
    )
  }),
  rest.get('/ajax/illust/:id/pages', (req, res, ctx) => {
    const { id } = req.params
    const work = ArtWorks[id]

    if (work)
      return res(
        ctx.delay(1200),
        ctx.status(200),
        ctx.json({
          body: work,
          error: false,
          message: '',
        })
      )

    return res(
      ctx.delay(1200),
      ctx.status(404),
      ctx.json({
        body: null,
        error: true,
        message: 'リクエストされたページが見つかりませんでした',
      })
    )
  }),
  rest.get('/ajax/illust/:id/ugoira_meta', (req, res, ctx) => {
    const { id } = req.params
    const body = Ugoiras[id]

    if (body)
      return res(
        ctx.delay(1200),
        ctx.status(200),
        ctx.json({
          body,
          error: false,
          message: '',
        })
      )

    return res(
      ctx.delay(1200),
      ctx.status(404),
      ctx.json({
        body: null,
        error: true,
        message: 'リクエストされたページが見つかりませんでした',
      })
    )
  }),
  // like
  rest.post('/ajax/illusts/like', (req, res, ctx) => {
    if (typeof req.body !== 'object')
      return res(
        ctx.delay(1200),
        ctx.status(400),
        ctx.json({
          body: null,
          error: true,
          message: 'リクエストの構文が不正です',
        })
      )

    const id = req.body.illust_id
    const work = Works[id]

    if (work) {
      work.likeData = true
      work.likeCount++
      return res(
        ctx.delay(1200),
        ctx.status(200),
        ctx.json({
          body: {
            is_liked: true,
          },
          error: false,
          message: '',
        })
      )
    }

    return res(
      ctx.delay(1200),
      ctx.status(404),
      ctx.json({
        body: null,
        error: true,
        message: 'リクエストされたページが見つかりませんでした',
      })
    )
  }),
  // bookmark
  rest.post('/ajax/illusts/bookmarks/add', (req, res, ctx) => {
    if (typeof req.body !== 'object')
      return res(
        ctx.delay(1200),
        ctx.status(400),
        ctx.json({
          body: null,
          error: true,
          message: 'リクエストの構文が不正です',
        })
      )

    const id = req.body.illust_id
    const work = Works[id]

    if (work) {
      work.bookmarkData = { id: '', private: !!req.body.restrict }
      work.bookmarkCount++
      return res(
        ctx.delay(1200),
        ctx.status(200),
        ctx.json({
          body: {
            last_bookmark_id: '',
            stacc_status_id: null,
          },
          error: false,
          message: '',
        })
      )
    }

    return res(
      ctx.delay(1200),
      ctx.status(404),
      ctx.json({
        body: null,
        error: true,
        message: 'リクエストされたページが見つかりませんでした',
      })
    )
  }),
]
