import React, { PropTypes } from 'react'
import less from './style.less'

const Progress = ({ size, onClick }) => (
  <div>
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      className={less.progress}
      onClick={onClick}
    >
      <g className={less.circular}>
        <path
          fill="none"
          d="M 14,1.5 A 12.5,12.5 0 1 1 1.5,14"
          strokeLinecap="round"
        />
      </g>
    </svg>
  </div>
)

Progress.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func.isRequired
}

Progress.defaultProps = {
  size: 256
}

export default Progress
