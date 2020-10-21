export interface SchemeJSON {
  field?: any;
}

export interface DataScheme<T extends SchemeJSON | SchemeJSON[]> {

  display(): string;

  toJson(): T;
}
