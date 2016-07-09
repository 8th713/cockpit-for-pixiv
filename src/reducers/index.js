import { combineReducers } from 'redux'
import error from './error'
import bookmark from './bookmark'
import help from './help'
import current from './current'
import illusts from './illusts'
import images from './images'
import viewSize from './viewSize'
import resize from './resize'
import toolbar from './toolbar'
import sidePanel from './sidePanel'
import addons from './addons'

export default combineReducers({
  error,
  bookmark,
  help,
  current,
  illusts,
  images,
  viewSize,
  resize,
  toolbar,
  sidePanel,
  addons
})
