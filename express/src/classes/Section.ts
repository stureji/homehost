'use strict';

export default class Section {
  #id: number;
  #name: string;
  #sort: number;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
    this.#sort = 1337;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get sort() {
    return this.#sort;
  }

  set sort(value: number) {
    this.#sort = value;
  }

  compareTo(other: Section): number {
    if(null === other) return 1;
    if(this === other) return 0;
    if(this.#sort === other.#sort){
      // equality gives 0
      return 0;
    } else {
      // else, sort by section priority...
      if(this.#sort > other.#sort) {
        return 1
      } else {
        return -1;
      }
    }
  }

  comparator(a: Section, b: Section): number {
    return a.compareTo(b);
  }
}
