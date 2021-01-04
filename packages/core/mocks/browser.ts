import { setupWorker } from 'msw'
import { bookmarkHandlers } from './bookmarkHandlers'
import { illustHandlers } from './illustHandlers'
import { pximgHandlers } from './pximgHandlers'
import { userHandlers } from './userHandlers'

export const worker = setupWorker(
  ...bookmarkHandlers,
  ...illustHandlers,
  ...pximgHandlers,
  ...userHandlers
)
