declare module 'camelize' {
  type CamelizeFn = (source: any) => any

  const camelize: CamelizeFn

  export = camelize
}
