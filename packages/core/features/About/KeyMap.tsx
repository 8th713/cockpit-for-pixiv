import { KEY_ASSIGNMENT } from '../../keyboardMap'
import { Subtitle } from '../../shared/Box'
import { Kbd } from '../../shared/Kbd'
import { Table, TableProps } from '../../shared/Table'

export interface KeyMapProps {}

const data: TableProps['data'] = Object.values(
  KEY_ASSIGNMENT
).map(({ assignment, description, title }) => [
  description,
  <Kbd>{title || assignment}</Kbd>,
])

export function KeyMap({}: KeyMapProps) {
  return (
    <div>
      <Subtitle css={{ marginBottom: '$2' }}>Shortcuts</Subtitle>
      <Table twoColumns rightAlign data={data} />
    </div>
  )
}
