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

  get shoppinglist() {
    return this.#shoppingList;
  }

  addRecipeToList(recipe: Recipe): boolean {
    const merge = this.#shoppingList.merge(recipe.toShoppingList());
    if(merge != null) {
      this.#shoppingList = merge;
      return true;
    }
    return false;
  }

  clearCheckedItems() {
    this.#shoppingList.list = this.#shoppingList.list.filter( i => !i.checked);
  }

  clearList() {
    this.#shoppingList = new ShoppingList();
  }

  display() {
    return 'User: ' + this.#username;
  }

  toJson() {
    return JSON.parse('{"id":' + this.#id + ',"username":"' + this.#username + '","shoppinglist":' + JSON.stringify(this.#shoppingList.toJson()) + '}');
  }
}
