import React, { PropTypes } from 'react'
import getSize from '../../utils/getSize'
import Progress from '../Progress'

const Img = ({ image, onClick, viewSize, resize }) => {
  let { src, alt } = image

  if (!image.width) {
    return <Progress onClick={onClick} />
  }

  const size = resize ? getSize(image, viewSize) : image

  return (
    <img
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      onClick={onClick}
    />
  )
}

Img.propTypes = {
  onClick: PropTypes.func.isRequired,
  // from react-redux
  image: PropTypes.object.isRequired,
  viewSize: PropTypes.object.isRequired,
  resize: PropTypes.bool.isRequired
}

export default Img
