import React, { useContext } from 'react'
import styled from 'styled-components'
import { color } from '../theme'
import { useIllust, useExpansion } from '../../hooks'
import {
  InfoActionContext,
  InfoValueContext,
  PickerValueContext,
  IllustContext
} from '../../contexts'
import { Divider } from '../shared/Divider'
import { Summary } from './Summary'
import { Desctiption } from './Desctiption'
import { UserCard } from './UserCard'
import { Progress } from '../shared/Progress'

export function Info() {
  const illustId = useContext(PickerValueContext)
  const context = useIllust(illustId)
  const [opened, toggleInfo] = useExpansion()

  return (
    <IllustContext.Provider value={context}>
      <InfoActionContext.Provider value={toggleInfo}>
        <InfoValueContext.Provider value={opened}>
          <Layout>
            <Summary />
            {opened && (
              <>
                <Divider m={16} />
                <Details>
                  <React.Suspense fallback={<Progress size={64} />}>
                    <Desctiption />
                  </React.Suspense>
                  <React.Suspense fallback={<Progress size={64} />}>
                    <UserCard />
                  </React.Suspense>
                </Details>
              </>
            )}
          </Layout>
        </InfoValueContext.Provider>
      </InfoActionContext.Provider>
    </IllustContext.Provider>
  )
}

const Layout = styled.div`
  all: unset;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  max-height: 30%;
  background-color: ${color.surface};
`
const Details = styled.div`
  all: unset;
  flex: 0 1 auto;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px;
  align-items: start;
  padding: 24px;
`
