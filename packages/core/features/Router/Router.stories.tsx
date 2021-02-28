import { Meta, Story } from '@storybook/react'
import { Works } from '../../mocks/data/works'
import { Grid } from '../../shared/Box'
import { AboutManager } from '../About/AboutManager'
import { Router, RouterProps } from './Router'

export default {
  title: 'Features/Router',
  component: Router,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <>
        <Grid css={{ gap: '$3' }}>
          {Object.values(Works).map((work) => (
            <div key={work.id}>
              <a href={`/artworks/${work.id}`} data-p="i.pximg.net">
                <img
                  style={{ verticalAlign: 'middle' }}
                  src={`https://via.placeholder.com/184.png?text=${work.id}`}
                  alt="placeholder"
                />
              </a>
            </div>
          ))}
        </Grid>
        <Story />
      </>
    ),
  ],
} as Meta

export const router: Story<RouterProps> = (args) => (
  <>
    <Router />
    <AboutManager title="About" />
  </>
)
