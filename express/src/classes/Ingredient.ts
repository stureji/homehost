'use strict';

import Grocery from "./Grocery";

export default class Ingredient {
  #amount0: number;
  #amountScaled: number;
  #unit: string;
  #grocery: Grocery;

  constructor(amount: number, unit: string, grocery: Grocery) {
    this.#amount0 = amount;
    this.#unit = unit;
    this.#grocery = grocery;
    this.#amountScaled = this.#amount0;
  }

  scale(value: number) {
    this.#amountScaled = value * this.#amount0;
  }

  get amount() {
    return this.#amountScaled;
  }

  get unit() {
    return this.#unit;
  }

  get grocery() {
    return this.#grocery;
  }

  display() {
    return this.#amountScaled + ' ' + this.#unit + ' ' + this.#grocery.name;
  }

  toJson() {
    return JSON.parse('{"name":"' + this.#grocery.name + '","amount":' + this.#amountScaled + ',"unit":"' + this.#unit + '"}');
  }
}