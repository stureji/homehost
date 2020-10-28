'use strict';

import {DataScheme, SchemeJSON} from './DataScheme.js';
import Section from './Section.js';

export interface GroceryJSON extends SchemeJSON {
  id: number,
  name: string,
  section: Section
}

export default class Grocery implements DataScheme<GroceryJSON> {
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

  display(): string {
    throw new Error("Method not implemented.");
  }

  toJson(): GroceryJSON {
    return {
      id: this.#id,
      name: this.#name,
      section: this.#section
    }
  }
}
