import * as React from 'react'
import { observer } from 'mobx-react'
import { SubTitle } from './SubTitle'
import { CheckBox } from './CheckBox'
import { Slider } from './Slider'
import { Padding } from '../shared/Icon'
import { ViewStore } from '../../store'

interface Props {
  store: ViewStore
}

@observer
export class Settings extends React.Component<Props> {
  handleSpreadChange = () => {
    this.props.store.toggleForcedSpread()
  }

  handlePaddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(event.currentTarget.valueAsNumber) === false) {
      this.props.store.setPadding(event.currentTarget.valueAsNumber)
    }
  }

  render() {
    const { store } = this.props

    return (
      <section>
        <SubTitle>Settings</SubTitle>
        <CheckBox
          checked={store.forcedSpread}
          onChange={this.handleSpreadChange}
          label="強制2カラム表示を使用する(推奨)"
          description={`投稿者のほとんどは見開きの設定をせずに作品を投稿します。
          このオプションを有効にすることで複数枚投稿を強制的に2カラムで表示できます。`}
        />
        <Slider
          value={store.padding}
          min={0}
          max={360}
          onChange={this.handlePaddingChange}
          label="画像ビューの余白(px)"
          icon={<Padding />}
        />
      </section>
    )
  }
}
