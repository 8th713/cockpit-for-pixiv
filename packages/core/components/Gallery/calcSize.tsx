import { Dimension, FitStatus, SpreadStatus } from '../../interfaces'

export function calcSize(
  board: Dimension,
  fit: FitStatus,
  spread: SpreadStatus,
  image: Dimension,
  multiple: boolean = false
) {
  if (fit === FitStatus.NONE) {
    return image
  }

  const needSpread = multiple && spread !== SpreadStatus.NONE
  const maxWidth = needSpread ? board.width / 2 : board.width
  const scaleX = Math.min(maxWidth / image.width, 1)
  if (fit === FitStatus.COVER) {
    return calc(image, scaleX)
  }

  const scale = Math.min(scaleX, board.height / image.height, 1)
  return calc(image, scale)
}

function calc({ width, height }: Dimension, scale: number) {
  return {
    width: width * scale,
    height: height * scale
  }
}
