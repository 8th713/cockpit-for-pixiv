import { render } from 'react-dom'

export default (data, dom) =>
  render(data, dom || document.body.appendChild(document.createElement('div')))
