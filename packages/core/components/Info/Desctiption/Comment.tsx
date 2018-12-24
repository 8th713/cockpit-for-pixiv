import React from 'react'
import { Illust } from '../../../interfaces'
import { Text } from '../../shared/Text'

type Props = {
  illust: Illust
  children?: never
}

export const Comment: React.FC<Props> = ({ illust }) => {
  const comment = illust.illustComment.trim()

  if (!comment) return null
  return <Text v="b2" dangerouslySetInnerHTML={{ __html: comment }} />
}
