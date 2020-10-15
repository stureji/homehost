'use strict';

import ShoppingList from './ShoppingList';

export default class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.shoppingList = new ShoppingList();
  }
}
