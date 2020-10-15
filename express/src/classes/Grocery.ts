'use strict';

import Section from './Section.js';

export default class Grocery {
  #name: string;
  #section: Section;

  constructor(name: string, section: Section) {
    this.#name = name;
    this.#section = section;
  }

  get name() {
    return this.#name;
  }

  get section() {
    return this.#section
  }
}
