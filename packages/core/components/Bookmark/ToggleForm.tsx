import React, {
  useContext,
  useDebugValue,
  useEffect,
  useMemo,
  useState
} from 'react'

type Props = {
  id: string
  children?: React.ReactNode
}

type Update = React.Dispatch<React.SetStateAction<boolean>>

const NO_PROVIDER = 'Missing ToggleForm'
const ValueContext = React.createContext<
  readonly [boolean, Update] | typeof NO_PROVIDER
>(NO_PROVIDER)
const UpdateContext = React.createContext<Update | typeof NO_PROVIDER>(
  NO_PROVIDER
)

export function useToggleForm() {
  const value = useContext(ValueContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  useDebugValue(value[0])
  return value
}

export function useUpdateToggleForm() {
  const value = useContext(UpdateContext)
  if (value === NO_PROVIDER) {
    throw new Error(NO_PROVIDER)
  }
  return value
}

export function ToggleForm({ id, children }: Props) {
  const [isOpend, setOpened] = useState(false)
  const value = useMemo(() => [isOpend, setOpened] as const, [isOpend])

  useEffect(() => setOpened(false), [id])

  return (
    <ValueContext.Provider value={value}>
      <UpdateContext.Provider value={setOpened}>
        {children}
      </UpdateContext.Provider>
    </ValueContext.Provider>
  )
}
