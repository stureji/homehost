'use strict';

import ShoppingList from './ShoppingList';

export default class User {
  #id;
  #username;
  #shoppingList;

  constructor(id, username) {
    this.#id = id;
    this.#username = username;
    this.#shoppingList = new ShoppingList();
  }

  toJson() {
    return JSON.parse('{"id":' + this.#id)
  }
}
