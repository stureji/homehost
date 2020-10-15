'use strict';

import Section from './Section.js';

export default class Grocery {
  #name;
  #section;

  constructor(name, section) {
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

const carrot = new Grocery('Morötter', 'Grönsaker');
const apples = new Grocery('Äpplen', 'Frukt');
const cheese = new Grocery('Ost', 'Mejeri');
