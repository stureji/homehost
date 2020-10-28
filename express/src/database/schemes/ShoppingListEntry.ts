'use strict';

import Grocery from './Grocery';

export default class ShoppingListEntry {
  #checked: boolean;
  #grocery: Grocery;

  constructor(grocery: Grocery) {
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
    return checkmark + this.#grocery.name;
  }

  toJson(): {checked: boolean, grocery: string} {
    return {
      checked: this.#checked,
      grocery: this.#grocery.name
    }
  }
}
