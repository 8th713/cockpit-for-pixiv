import * as timm from 'timm'

const methods = Object.keys(timm).filter((key) =>
  typeof timm[key] === 'function'
)

function chain(obj) {
  const bind = (method, data) =>
    (...args) => chain(method(data, ...args))

  const proxy = { value: () => obj }
  for (const key of methods) {
    proxy[key] = bind(timm[key], obj)
  }

  return proxy
}

for (const key of methods) {
  chain[key] = timm[key]
}

export default chain
