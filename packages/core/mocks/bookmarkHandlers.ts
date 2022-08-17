import { rest } from 'msw'
import { Forms } from './data/forms'
import { Users } from './data/users'

export const bookmarkHandlers = [
  rest.get('/bookmark_add.php', (req, res, ctx) => {
    const params = Object.fromEntries(req.url.searchParams)
    const id = params.illust_id
    const form = Forms[id]

    if (form)
      return res(
        ctx.delay(1200),
        ctx.status(200),
        ctx.set('content-type', 'text/html; charset=UTF-8'),
        ctx.body(form)
      )

    return res(ctx.delay(1200), ctx.status(404), ctx.text(''))
  }),
  // follow
  rest.post('/bookmark_add.php', (req, res, ctx) => {
    const params = new URLSearchParams(req.body as string)
    const id = params.get('user_id')!
    const author = Users[id]

    if (author) {
      if (!author.isFollowed) {
        author.isFollowed = true
        author.following++
      }
      return res(ctx.delay(1200), ctx.status(200), ctx.json({}))
    }
    return res(ctx.delay(1200), ctx.status(404), ctx.json({}))
  }),
]
