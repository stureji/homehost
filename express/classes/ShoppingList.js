'use strict';

import Grocery from './Grocery';

class ShoppingTuple {
  #checked;
  #grocery;

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

  toJson() {
    return JSON.parse('{"checked":' + this.#checked + ',"grocery":"' + this.#grocery.name + '"}');
  }
}

export default class ShoppingList {
  #listOfShoppingTuples;

  constructor() {
    this.#listOfShoppingTuples = new Array();
  }

  get list() {
    return this.#listOfShoppingTuples;
  }

  add(grocery) {
    const tupe = new ShoppingTuple(name, grocery);
    this.#listOfShoppingTuples.push(tupe);
    this.sort();
  }

  sort() {
    this.#listOfShoppingTuples.sort( (a, b) => a.grocery.compareTo(b.grocery) );
  }

  merge(otherList) {
    if(null === otherList) return false;
    if(this === otherList) return false;
    if(this.#listOfShoppingTuples.size === 0) {
      if(otherList.size < 1) {
        return false;
      } else {
        this.#listOfShoppingTuples = otherList;
        return true;
      }
    }
    otherList.list.forEach( tupe => this.#listOfShoppingTuples.push(tupe.grocery));
  }

  display() {
    return this.#listOfShoppingTuples.map( tupe => tupe.display()).join('\n');
  }

  toJson() {
    return JSON.parse( '{"list:' + JSON.stringify(this.#listOfShoppingTuples.map( tupe => tupe.toJson() )) + "}");
  }
}
