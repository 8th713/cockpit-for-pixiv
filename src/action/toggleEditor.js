// @flow
import {computed} from 'mobx'
import Action from './interface'
import route, {type Route} from '../store/route'
import useCase, {type EditorUseCase} from '../useCase/editor'

export class ToggleEditor extends Action {
  route: Route;
  useCase: EditorUseCase;

  constructor(route: Route, useCase: EditorUseCase) {
    super()
    this.route = route
    this.useCase = useCase
  }

  category = 'illust'
  description = 'ブックマーク'
  key = 'b'
  type = 'keydown'
  repeat = false
  label = 'ブックマーク(B)'
  icon = 'bookmark'

  @computed get active(): boolean {
    if (this.route.illust) {
      return this.route.illust.bookmark.isBookmarked
    }
    return false
  }

  @computed get disabled(): boolean {
    if (this.route.illust) {
      return this.route.illust.bookmark.isSelf
    }
    return true
  }

  execute = () => {
    this.useCase.toggle()
  };
}

export default new ToggleEditor(route, useCase)
