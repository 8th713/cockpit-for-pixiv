import { Meta } from '@storybook/react'
import React from 'react'
import { KEY_ASSIGNMENT } from '../keyboardMap'
import { Box } from './Box'
import { Dd, Dl, Dt } from './Dl'

export default {
  title: 'Components/Dl',
  component: Dl,
  subcomponents: { Dt, Dd },
  decorators: [
    (Story) => (
      <Box css={{ width: 600 }}>
        <Story />
      </Box>
    ),
  ],
} as Meta

const keys = Object.values(KEY_ASSIGNMENT)

export const KeyAssignment = () =>
  keys.map(({ assignment, description, title }) => (
    <Dl key={assignment} css={{ justifyContent: 'space-between' }}>
      <Dt>{description}</Dt>
      <Dd>{title || assignment}</Dd>
    </Dl>
  ))

export const Profile = () => (
  <>
    <Dl>
      <Dt css={{ width: '50%' }}>性別</Dt>
      <Dd css={{ width: '50%' }}>Female</Dd>
    </Dl>
    <Dl>
      <Dt css={{ width: '50%' }}>居住地</Dt>
      <Dd css={{ width: '50%' }}>ニューヨーク</Dd>
    </Dl>
    <Dl>
      <Dt css={{ width: '50%' }}>誕生日</Dt>
      <Dd css={{ width: '50%' }}>12/31</Dd>
    </Dl>
    <Dl>
      <Dt css={{ width: '50%' }}>職業</Dt>
      <Dd css={{ width: '50%' }}>クリエイター</Dd>
    </Dl>
  </>
)
