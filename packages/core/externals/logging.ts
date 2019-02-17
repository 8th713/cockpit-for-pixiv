export type LoggingService = ReturnType<typeof createLoggingService>

export function createLoggingService() {
  const logs: string[] = []

  function log(error: Error, location?: string) {
    logs.push(`${location || '(anonymous)'}: ${error.stack!}`)
  }
  function clear() {
    logs.length = 0
  }
  function dump() {
    return logs
  }

  return { log, clear, dump }
}
