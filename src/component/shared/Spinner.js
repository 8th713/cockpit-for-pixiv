// @flow
import './styles/Spinner.css'
import React, {PureComponent} from 'react'

type Props = {
  +size?: number;
  +center?: boolean;
}

export default class Spinner extends PureComponent<void, Props, void> {
  render() {
    const {size = 56, center = false, ...rest} = this.props
    const style = {margin: center ? 'auto' : ''}

    return (
      <svg
        {...rest}
        className="Spinner"
        style={style}
        width={size}
        height={size}
        viewBox="0 0 66 66"
      >
        <circle
          className="Spinner-path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    )
  }
}
