import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Table } from './Table'
import { Users } from '../mocks/data/users'
import { KEY_ASSIGNMENT } from '../keyboardMap'
import { Kbd } from './Kbd'

export default {
  title: 'Shared/Table',
  component: Table,
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'Light',
    },
  },
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

const user = Users['1010501']
const columns = [
  ['region', '居住地'],
  ['birthDay', '誕生日'],
  ['gender', '性別'],
  ['job', '職業'],
] as const
const data: [string, string | null][] = columns.map(([key, label]) => [
  label,
  user[key].name,
])

export const Basic = Template.bind({})
Basic.args = { data }

export const TwoColumns = Template.bind({})
TwoColumns.args = {
  twoColumns: true,
  data,
}

export const RightAlign = Template.bind({})
RightAlign.args = {
  rightAlign: true,
  data,
}

export const Example = Template.bind({})
Example.args = {
  twoColumns: true,
  rightAlign: true,
  data: Object.values(KEY_ASSIGNMENT).map(
    ({ assignment, description, title }) => {
      return [description, <Kbd>{title || assignment}</Kbd>]
    }
  ),
}
