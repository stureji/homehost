'use strict';

import Ingredient from "./Ingredient";
import ShoppingList from "./ShoppingList";
import ShoppingListEntry from "./ShoppingListEntry";

export default class Recipe {
  #id: number;
  #name: string;
  #ingredientsArray: Array<Ingredient>;
  #instructions: string;
  #scale: number;

  constructor(id: number, nameOfRecipe: string, arrayWithIngredients: Array<Ingredient>, instructions: string) {
    this.#id = id;
    this.#name = nameOfRecipe;
    this.#ingredientsArray = arrayWithIngredients;
    this.#instructions = instructions;
    this.#scale = 1.0;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get ingredients() {
    return this.#ingredientsArray;
  }

  get instructions() {
    return this.#instructions;
  }

  get getScale() {
    return this.#scale;
  }

  scale(newScale: number) {
    this.#scale = newScale;
    this.#ingredientsArray.forEach( i => i.scale(this.#scale) );
  }

  toShoppingList() {
    const list = new ShoppingList();
    this.#ingredientsArray.forEach( i => list.list.push(new ShoppingListEntry(i.grocery)) );
    list.sort();
    return list;
  }

  toJson() {
    var json = '{"id": ' + this.#id + ',"name":"' + this.#name + '","ingredients":';
    json += JSON.stringify(this.#ingredientsArray.map( i => i.toJson()));
    json += ',"instructions":"' + this.#instructions + '"}';
    return JSON.parse(json)
  }
}
