import { Dimension } from '../../interfaces'
import { FitStatus, SpreadStatus } from '../../constants'

export function calcSize(
  boardSize: Dimension,
  fit: FitStatus,
  spread: SpreadStatus,
  imageSize: Dimension,
  multiple: boolean = false
) {
  if (fit === FitStatus.NONE) {
    return imageSize
  }

  const needSpread = multiple && spread !== SpreadStatus.NONE
  const maxWidth = needSpread ? boardSize.width / 2 : boardSize.width
  const scaleX = Math.min(maxWidth / imageSize.width, 1)

  if (fit === FitStatus.COVER) {
    return calc(imageSize, scaleX)
  }

  const scale = Math.min(scaleX, boardSize.height / imageSize.height, 1)

  return calc(imageSize, scale)
}

function calc({ width, height }: Dimension, scale: number) {
  return {
    width: width * scale,
    height: height * scale
  }
}
