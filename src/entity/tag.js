// @flow
import {computed} from 'mobx'
import {type Editor} from '../store/editor'

export const defaults = {lev: 6, total: 0}

export default class Tag {
  editor: Editor;

  name: string;
  url: string;
  lev: number;
  total: number;

  constructor(
    editor: Editor,
    name: string,
    url: string = '',
    src: TagSource = defaults
  ) {
    this.editor = editor

    this.name = name
    this.url = url
    this.lev = src.lev
    this.total = src.total
  }

  @computed get active(): boolean {
    return this.editor.tagArray.includes(this.name)
  }

  @computed.struct get classes(): Object {
    const {active} = this

    switch (this.lev) {
      case 1:
        return {lev1: true, active}
      case 2:
        return {lev2: true, active}
      case 3:
        return {lev3: true, active}
      case 4:
        return {lev4: true, active}
      case 5:
        return {lev5: true, active}
      default:
        return {lev6: true, active}
    }
  }
}
