import React from 'react'
import styled from 'styled-components'
import { BookmarkForm, Illust } from '../../interfaces'
import { Text } from '../shared/Text'
import { TextField } from '../shared/TextField'
import { SortButtons } from './SortButtons'
import { splitTag, toggleTag, sortBy } from './utils'
import { useSort } from './SortHost'

type Props = {
  userTags: BookmarkForm['userTags']
  illustTags: Illust['tags']['tags']
  value: string
  onChange: (value: { tags: string }, valid: boolean) => void
}

const MAX_LENGTH = 10
const isValid = (tags: string[] | string) => {
  if (!Array.isArray(tags)) tags = splitTag(tags)
  return tags.length <= MAX_LENGTH
}

export function Tags({ illustTags, userTags, value, onChange }: Props) {
  const selectedTags = splitTag(value)
  const valid = isValid(selectedTags)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value
    onChange({ tags }, isValid(tags))
  }
  const handleTagging = (tag: string) => {
    const tags = toggleTag(selectedTags, tag)
    onChange({ tags }, isValid(tags))
  }
  const { column, direction } = useSort()
  const sotedTags = sortBy(userTags, column, direction)

  return (
    <Root>
      <FieldBox>
        <TextField
          type="text"
          name="tags"
          invalid={!valid}
          value={value}
          onChange={handleChange}
        >
          ブックマークタグ
        </TextField>
        <TextField.HelperLine>
          <TextField.HelperText>
            スペース区切りで10個まで登録できます。英数字等は半角に統一されます。
          </TextField.HelperText>
          <TextField.Counter data-invalid={!valid}>
            {selectedTags.length} / {MAX_LENGTH}
          </TextField.Counter>
        </TextField.HelperLine>
      </FieldBox>
      <FieldBox>
        <Header>
          <Text as="h2">この作品のタグ</Text>
        </Header>
        <TagList>
          {illustTags.map(item => (
            <Tag
              key={item.tag}
              type="button"
              aria-pressed={selectedTags.includes(item.tag)}
              onClick={() => handleTagging(item.tag)}
            >
              {item.tag}
            </Tag>
          ))}
        </TagList>
      </FieldBox>
      <FieldBox>
        <Header>
          <Text as="h2">あなたのブックマークタグ</Text>
          <SortButtons />
        </Header>
        <TagList>
          {sotedTags.map(item => (
            <Tag
              key={item.name}
              type="button"
              data-level={item.lev}
              aria-pressed={selectedTags.includes(item.name)}
              onClick={() => handleTagging(item.name)}
            >
              {item.name}
            </Tag>
          ))}
        </TagList>
      </FieldBox>
    </Root>
  )
}

const Root = styled.div`
  margin-top: 24px;
`
const FieldBox = styled.div`
  & + & {
    margin-top: 16px;
  }
`
const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`
const TagList = styled.div`
  position: relative;
  overflow: hidden;
  padding: 16px 8px 8px 16px;
  border-radius: 8px;
  line-height: 32px;
  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--on-surface);
    opacity: var(--divider);
  }
`
const Tag = styled.button`
  cursor: pointer;
  user-select: none;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 0;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 2px 8px;
  border: 0;
  border-radius: 2px;
  background-color: transparent;
  color: var(--primary);
  font: inherit;
  line-height: 1;
  &[aria-pressed='true'] {
    background-color: var(--primary);
    color: var(--on-primary);
  }
  &[data-level='1'] {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
  &[data-level='2'] {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.02em;
  }
  &[data-level='3'] {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  &[data-level='4'] {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.04em;
  }
  &[data-level='5'] {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  &[data-level='6'] {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0em;
  }
  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    opacity: var(--enabled);
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:hover::before {
    opacity: var(--hovered);
  }
  &:focus::before {
    opacity: var(--focused);
  }
  &:active::before {
    opacity: var(--pressed);
  }
`
