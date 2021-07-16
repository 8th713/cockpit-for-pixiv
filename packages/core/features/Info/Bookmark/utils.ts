import { Control, useForm, UseFormSetValue, useWatch } from 'react-hook-form'

export interface BookmarkFormValues {
  restrict: boolean
  comment: string
  tags: string
}

export type FormControl = Control<BookmarkFormValues>
export type FormSetValue = UseFormSetValue<BookmarkFormValues>

export const useBookmarkForm = () =>
  useForm<BookmarkFormValues>({
    shouldUseNativeValidation: true,
    defaultValues: {
      restrict: false,
      comment: '',
      tags: '',
    },
  })

export const useWatchTags = (control: FormControl) =>
  splitTags(useWatch({ control, name: 'tags' }))

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
