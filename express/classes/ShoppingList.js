'use strict';

import Grocery from './Grocery';

class ShoppingTuple {
  #checked
  #grocery

  constructor(grocery) {
    this.#checked = false;
    this.#grocery = grocery;
  }

  get checked() {
    return this.#checked;
  }

  get grocery() {
    return this.#grocery;
  }

  toggle() {
    this.#checked = !this.#checked;
    return this.#checked;
  }

  display() {
    var checkmark = '[ ]: ';
    if(this.#checked) {
      checkmark = '[x]: ';
    }
    return checkmark + this.#grocery;
  }
}

export default class ShoppingList {
  #groceryList;

  constructor() {
    this.#groceryList = new Array();
  }

  get list() {
    return this.#groceryList;
  }

  push(grocery) {
    const name = grocery.name;
    const tupe = new ShoppingTuple(name);
    this.#groceryList.push(tupe);
  }

  display() {
    return this.#groceryList.map( tupe => tupe.display()).join('\n');
  }
}
