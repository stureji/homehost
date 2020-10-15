'use strict';

export default class Recipe {
  #name;
  #ingredientsArray;
  #instructions;
  #scale;

  constructor(nameOfRecipe, arrayWithIngredients, instructions) {
    this.#name = nameOfRecipe;
    this.#ingredientsArray = arrayWithIngredients;
    this.#instructions = instructions;
    this.#scale = 1.0;
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

  get scale() {
    return this.#scale;
  }

  scale(newScale) {
    this.#scale = newScale;
    this.#ingredientsArray.forEach( i => i.scale(this.#scale) );
  }

  toJson() {
    var json = '{"name":"' + this.#name + '","ingredients":';
    json += JSON.stringify(this.#ingredientsArray.map( i => i.toJson()));
    json += ',"instructions":"' + this.#instructions + '"}';
    return JSON.parse(json)
  }
}
