'use strict';

import Ingredient, { IngredientJSON } from "./Ingredient";
import ShoppingList from "./ShoppingList";
import ShoppingListEntry from "../ShoppingListEntry";
import {DataScheme, SchemeJSON} from './DataScheme';

export interface RecipeJSON extends SchemeJSON {
  id: number,
  name: string,
  ingredients: IngredientJSON[],
  instructions: string
}

export default class Recipe implements DataScheme<RecipeJSON> {
  #id: number;
  #name: string;
  #ingredientsArray: Ingredient[];
  #instructions: string;
  #scale: number;

  constructor(id: number, nameOfRecipe: string, arrayWithIngredients: Ingredient[], instructions: string) {
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

  display(): string {
    throw new Error("Method not implemented.");
  }

  toJson(): RecipeJSON {
    return {
      id: this.#id,
      name: this.#name,
      ingredients: this.#ingredientsArray.map(x => x.toJson()),
      instructions: this.#instructions
    }
  }
}
