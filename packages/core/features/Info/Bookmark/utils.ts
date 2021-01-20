import { Control, useForm, UseFormMethods, useWatch } from 'react-hook-form'

export interface BookmarkFormValues {
  restrict: boolean
  comment: string
  tags: string
}

export type BookmarkFormMethods = UseFormMethods<BookmarkFormValues>

export interface FormFieldProps {
  control: BookmarkFormMethods['control']
  register: BookmarkFormMethods['register']
  errors: BookmarkFormMethods['errors']
}

export const useBookmarkForm = () =>
  useForm<BookmarkFormValues>({
    mode: 'onBlur',
    defaultValues: {
      restrict: false,
      comment: '',
      tags: '',
    },
  })

export const useWatchTags = (control: Control<BookmarkFormValues>) => {
  const fieldValue = useWatch<string>({ control, name: 'tags' }) || ''

  return splitTags(fieldValue)
}

export const splitTags = (tags: string) =>
  tags
    .trim()
    .split(/[\s\xA0　]+/)
    .filter((t) => t.length)

export const toggleTag = (list: string[], tag: string) => {
  const set = new Set(list)

  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  return [...set].join(' ')
}
