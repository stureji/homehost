export default interface DataScheme<T> {

  display(): string

  toJson(): T
}
