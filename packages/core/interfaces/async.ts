import { AsyncStatus } from './enum'

export type LoadingResult = {
  status: AsyncStatus.Loading
  value: null
}

export type SuccessResult<T> = {
  status: AsyncStatus.Success
  value: T
}

export type FailureResult = {
  status: AsyncStatus.Failure
  value: string
}

export type Result<T> = LoadingResult | SuccessResult<T> | FailureResult
