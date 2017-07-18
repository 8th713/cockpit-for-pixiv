// @flow
export default class Action {
  category: 'viewer' | 'illust' | 'help';
  description: string;
  key: string;
  type: 'keydown' | 'keypress' | 'keyup';
  repeat: boolean;
  label: string;
  +icon: string;
  +active: boolean;
  +disabled: boolean;
  execute(): void {}
}
