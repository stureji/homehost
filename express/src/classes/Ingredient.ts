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
    return this.#amountScaled;
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
    if(this.#amountScaled > 0) {
      return this.#amountScaled + ' ' + this.#unit + ' ' + this.#grocery.name;
    }
    return this.#grocery.name + ' ' + this.#unit;
  }

  toJson() {
    return JSON.parse('{"name":"' + this.#grocery.name + '","amount":' + this.#amountScaled + ',"unit":"' + this.#unit + '"}');
  }
}
