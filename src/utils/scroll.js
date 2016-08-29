import animate from './animation'
import less from './scroll.less'

// destination の位置まで移動
export function to(target, destination) {
  return animate({
    from: target,
    to: { scrollTop: destination }
  }).play()
}

// distance 分だけ移動
export function by(target, distance) {
  return to(target, target.scrollTop + distance)
}

export function show(target) {
  target.classList.remove(less.noScrollbar)
}

export function hide(target) {
  target.classList.add(less.noScrollbar)
}
