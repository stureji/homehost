'use strict';

export default class Section {
  #id;
  #name;
  #sort;

  constructor(id, name) {
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

  set sort(value) {
    this.#sort = value;
  }

  compareTo(other) {
    if(null === other) return 1;
    if(this === other) return 0;
    if(this.#sort < other.sort) {
      return 1;
    } else {
      return -1;
    }
  }
}
