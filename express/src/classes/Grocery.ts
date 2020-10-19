'use strict';

import Section from './Section.js';

export default class Grocery {
  #id: number;
  #name: string;
  #section: Section;

  constructor(id: number, name: string, section: Section) {
    this.#id = id;
    this.#name = name;
    this.#section = section;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get section() {
    return this.#section
  }
}
