'use strict';

import Recipe from './Recipe';
import ShoppingList, { ShoppingListJSON } from './ShoppingList';
import {DataScheme, SchemeJSON} from './DataScheme';

export interface UserJSON extends SchemeJSON {
  id: number,
  username: string,
  shoplist: ShoppingListJSON[]
}

export default class User implements DataScheme<UserJSON> {
  #id: number;
  #username: string;
  #shoppingList: ShoppingList;

  constructor(id: number, username: string, shoplist: ShoppingList = new ShoppingList()) {
    this.#id = id;
    this.#username = username;
    this.#shoppingList = shoplist;
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

  toJson(): UserJSON {
    return {
      id: this.#id,
      username: this.#username,
      shoplist: this.#shoppingList.toJson()
    }
  }
}
