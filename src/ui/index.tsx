import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppStore } from '../store/AppStore'
import { View } from './view'
import { Info } from './info'
import { ToolBar } from './toolbar'
import { Bookmark } from './bookmark'
import { Help } from './help'

export const render = (store: AppStore) => {
  ReactDOM.render(
    <>
      <View store={store.view}>
        <Info store={store.info} />
        <ToolBar store={store} />
      </View>
      <Bookmark store={store.bookmark} />
      <Help store={store} />
    </>,
    document.body.appendChild(document.createElement('div'))
  )
}
