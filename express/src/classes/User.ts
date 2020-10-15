'use strict';

import Recipe from './Recipe';
import ShoppingList from './ShoppingList';

export default class User {
  #id: number;
  #username: string;
  #shoppingList: ShoppingList;

  constructor(id: number, username: string) {
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

  addRecipeToList(recipe: Recipe) {
    this.#shoppingList.merge(recipe.toShoppingList());
  }

  clearCheckedItems() {
    this.#shoppingList.list = this.#shoppingList.list.filter( i => !i.checked);
  }

  clearList() {
    this.#shoppingList = new ShoppingList();
  }

  display() {
    return '';
  }

  toJson() {
    return JSON.parse('{"id":' + this.#id + ',"shoppinglist":' + JSON.stringify(this.#shoppingList.toJson()) + '}');
  }
}
