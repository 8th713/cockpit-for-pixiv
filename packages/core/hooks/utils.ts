import { SuccessResult, FailureResult, AsyncStatus } from '../interfaces'

export function success<T>(value: T): SuccessResult<T> {
  return { status: AsyncStatus.Success, value }
}

export function failure(error: any): FailureResult {
  let value: string
  if (error.json) {
    value = error.json.message
  } else {
    value = error.message
  }
  return { status: AsyncStatus.Failure, value }
}

export function getErrorMessage(error: any) {
  let value: string
  if (error.json) {
    value = error.json.message
  } else {
    value = error.message
  }
  return value
}
