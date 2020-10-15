'use strict';

import Grocery from './Grocery';
import ShoppingTuple from './ShoppingTuple';

export default class ShoppingList {
  #listOfShoppingTuples: Array<ShoppingTuple>;

  constructor() {
    this.#listOfShoppingTuples = new Array<ShoppingTuple>();
  }

  get list() {
    return this.#listOfShoppingTuples;
  }

  set list(value) {
    this.#listOfShoppingTuples = value;
  }

  get length() {
    return this.#listOfShoppingTuples.length;
  }

  add(grocery: Grocery) {
    const tupe = new ShoppingTuple(grocery);
    this.#listOfShoppingTuples.push(tupe);
    this.sort();
  }

  sort() {
    this.#listOfShoppingTuples.sort( (a, b) => a.grocery.section.compareTo(b.grocery.section) );
  }

  merge(otherList: ShoppingList) {
    if(null === otherList) return false;
    if(this === otherList) return false;
    if(this.#listOfShoppingTuples.length === 0) {
      if(otherList.length < 1) {
        return false;
      } else {
        this.#listOfShoppingTuples = otherList.list;
        return true;
      }
    }
    otherList.list.forEach( tupe => this.#listOfShoppingTuples.push(tupe));
  }

  display() {
    return this.#listOfShoppingTuples.map( tupe => tupe.display()).join('\n');
  }

  toJson() {
    return JSON.parse('{"list":' + JSON.stringify(this.#listOfShoppingTuples.map( tupe => tupe.toJson() )) + '}');
  }
}
