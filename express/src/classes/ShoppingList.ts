'use strict';

import Grocery from './Grocery';
import ShoppingListEntry from './ShoppingListEntry';

export default class ShoppingList {
  #listOfShoppingTuples: Array<ShoppingListEntry>;

  constructor() {
    this.#listOfShoppingTuples = new Array<ShoppingListEntry>();
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
    const tupe = new ShoppingListEntry(grocery);
    this.#listOfShoppingTuples.push(tupe);
    this.sort();
  }

  remove(grocery: Grocery): boolean {
    const tupe = new ShoppingListEntry(grocery);
    const search = this.#listOfShoppingTuples.find( x => x.grocery.name == grocery.name);
    if(search != undefined) {
      this.#listOfShoppingTuples.splice(this.#listOfShoppingTuples.indexOf(search), 1);
      return true;
    }
    return false;
  }

  sort() {
    this.#listOfShoppingTuples.sort( (a, b) => {
      const sectionPriorityComparison = a.grocery.section.compareTo(b.grocery.section)
      if(sectionPriorityComparison === 0) {
        if(a.grocery.name > b.grocery.name) {
          return 1;
        } else {
          return -1;
        }
      } else return sectionPriorityComparison;
    });
  }

  merge(otherList: ShoppingList): ShoppingList | null {
    if(null === otherList) return null;
    if(this === otherList) return null;
    const merged = new ShoppingList();
    if(this.#listOfShoppingTuples.length === 0) {
      if(otherList.length < 1) {
        return null;
      } else {
        this.#listOfShoppingTuples == otherList.#listOfShoppingTuples;
        return this;
      }
    }
    this.#listOfShoppingTuples.forEach(tupe => merged.#listOfShoppingTuples.push(tupe));
    otherList.#listOfShoppingTuples.forEach(tupe => merged.#listOfShoppingTuples.push(tupe));
    merged.sort();
    return merged;
  }

  display() {
    return this.#listOfShoppingTuples.map( tupe => tupe.display()).join('\n');
  }

  toJson() {
    return JSON.parse('{"list":' + JSON.stringify(this.#listOfShoppingTuples.map( tupe => tupe.toJson() )) + '}');
  }
}
