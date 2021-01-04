import { rest } from 'msw'

export const pximgHandlers = [
  rest.get('https://i.pximg.net/c/250x250_80_a2/*', async (req, res, ctx) => {
    const originalResponse: Response = await ctx.fetch('dummy.png')
    const img = await originalResponse.arrayBuffer()

    return res(
      ctx.set('Content-Length', img.byteLength.toString()),
      ctx.set('Content-Type', 'image/png'),
      ctx.body(img)
    )
  }),
  rest.get('https://i.pximg.net/img-zip-ugoira/*', async (req, res, ctx) => {
    const fileName = req.url.pathname.split('/').pop()!
    const originalResponse: Response = await ctx.fetch(fileName)
    const zip = await originalResponse.arrayBuffer()

    return res(
      ctx.delay(1200),
      ctx.set('Content-Length', zip.byteLength.toString()),
      ctx.set('Content-Type', 'application/zip'),
      ctx.body(zip)
    )
  }),
]
