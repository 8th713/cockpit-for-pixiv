import { rest } from 'msw'
import { RecentWorks } from './data/recentWorks'
import { Users } from './data/users'

export const userHandlers = [
  rest.get('/ajax/user/:id', (req, res, ctx) => {
    const { id } = req.params
    const body = Users[id]

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
        error: false,
        message: 'リクエストされたページが見つかりませんでした',
      })
    )
  }),
  rest.get('/ajax/user/:id/profile/top', (req, res, ctx) => {
    const { id } = req.params
    const body = RecentWorks[id]

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
        error: false,
        message: 'リクエストされたページが見つかりませんでした',
      })
    )
  }),
]
