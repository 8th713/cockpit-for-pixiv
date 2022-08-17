import { Badge } from '../../shared/Badge'
import { styled } from '../../stitches.config'
import { Backdrop } from './Backdrop'
import { useNodeList } from './useNodeList'
import { useCurrentElement } from './useScrollObserver'

export function PageCount({ hidden }: { hidden?: boolean }) {
  const nodes = useNodeList()
  const element = useCurrentElement()
  const index = nodes.get(element!)!

  if (hidden || nodes.size < 2 || !element) return null

  return (
    <Backdrop right>
      <Content max={nodes.size}>{index + 1}</Content>
    </Backdrop>
  )
}

const Content = styled(Badge, {
  position: 'sticky',
  top: '$2',
  right: '$2',
})
