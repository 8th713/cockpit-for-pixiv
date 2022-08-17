import { Fragment } from 'react'
import { Divider } from '../../shared/Divider'
import { HTMLText } from '../../shared/HTMLText'

export interface ProfileCommentProps {
  children?: string
}

export function ProfileComment({ children }: ProfileCommentProps) {
  return children ? (
    <Fragment>
      <Divider />
      <HTMLText>{children}</HTMLText>
    </Fragment>
  ) : null
}
