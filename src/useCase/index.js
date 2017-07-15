// @flow
import route from './route'
import viewer from './viewer'
import illust from './illust'
import image from './image'
import editor from './editor'
import account from './account'
import help from './help'

export class UseCase {
  route = route;
  viewer = viewer;
  illust = illust;
  image = image;
  editor = editor;
  account = account;
  help = help;
}

export default new UseCase()
