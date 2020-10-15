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

  get id() {
    return this.#id;
  }

  get username() {
    return this.#username;
  }

  addRecipeToList(recipe) {
    this.#shoppingList.merge(recipe.toShoppingList());
  }

  clearCheckedItems() {
    this.#shoppingList = this.#shoppingList.list.filter( i => !i.checked);
  }

  clearList() {
    this.#shoppingList = new ShoppingList();
  }

  toJson() {
    return JSON.parse('{"id":' + this.#id + ',"shoppinglist":"' + JSON.stringify(this.#shoppingList.toJson()) + '"}' );
  }
}
