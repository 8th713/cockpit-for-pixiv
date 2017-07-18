// @flow
import {computed} from 'mobx'
import Action from './interface'
import viewer, {Viewer} from '../store/viewer'
import useCase, {type ViewerUseCase} from '../useCase/viewer'

export class ToggleFit extends Action {
  viewer: Viewer;
  useCase: ViewerUseCase;

  constructor(viewer: Viewer, useCase: ViewerUseCase) {
    super()
    this.viewer = viewer
    this.useCase = useCase
  }

  category = 'viewer';
  description = 'リサイズ';
  key = 'v';
  type = 'keydown';
  repeat = false;
  label = 'リサイズ(V)';

  @computed get icon(): string {
    return this.viewer.resize ? 'zoom_in' : 'zoom_out'
  };

  execute = () => {
    this.useCase.toggleFit()
  };
}

export default new ToggleFit(viewer, useCase)
