import { Fragment } from 'react'
import { Divider } from '../../shared/Divider'
import { Table } from '../../shared/Table'

export interface ProfileDetailsProps {
  user: Pixiv.User
}

const columns = [
  ['region', '居住地'],
  ['birthDay', '誕生日'],
  ['gender', '性別'],
  ['job', '職業'],
] as const

export function ProfileDetails({ user }: ProfileDetailsProps) {
  const personalData: [
    string,
    string | null
  ][] = columns.map(([key, label]) => [label, user[key].name])
  const useTable = personalData.reduce((res, [_, value]) => {
    return res || !!value
  }, false)

  return useTable ? (
    <Fragment>
      <Divider />
      <Table twoColumns data={personalData} />
    </Fragment>
  ) : null
}
