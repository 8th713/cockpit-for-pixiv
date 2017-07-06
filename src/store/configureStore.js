import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import rootSaga from '../sagas'

export default function configureStore(initialState) {
  const middlewares = []
  const sagaMiddleware = createSagaMiddleware()

  middlewares.push(sagaMiddleware)
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const {createLogger} = require('redux-logger')
    const logger = createLogger({ collapsed: true })
    middlewares.push(logger)
  }

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  sagaMiddleware.run(rootSaga, store)
  return store
}
