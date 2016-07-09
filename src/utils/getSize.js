const getScale = (x, y) => ((x < y) ? x / y : 1)

export default function getSize({ width, height }, view, margin = 20) {
  const scaleX = getScale(view.width - margin * 2, width)
  const scaleY = getScale(view.height - margin * 2, height)
  const scale = Math.min(scaleX, scaleY)

  return {
    width: width * scale,
    height: height * scale
  }
}
