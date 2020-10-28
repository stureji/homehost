'use strict';

import {DataScheme, SchemeJSON} from "./DataScheme";
import Grocery from "./Grocery";

export interface IngredientJSON extends SchemeJSON {
  id: number,
  amount: number,
  unit: string,
  name: string
}

export default class Ingredient implements DataScheme<IngredientJSON> {
  #id: number;
  #amount0: number;
  #amountScaled: number;
  #unit: string;
  #grocery: Grocery;

  constructor(id: number, amount: number, unit: string, grocery: Grocery) {
    this.#id = id;
    this.#amount0 = amount;
    this.#unit = unit;
    this.#grocery = grocery;
    this.#amountScaled = this.#amount0;
  }

  scale(value: number) {
    this.#amountScaled = value * this.#amount0;
    return this.#amountScaled;
  }

  get id() {
    return this.#id;
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

  display(): string {
    if(this.#amountScaled > 0) {
      return this.#amountScaled + ' ' + this.#unit + ' ' + this.#grocery.name;
    }
    return this.#grocery.name + ' ' + this.#unit;
  }

  toJson(): IngredientJSON {
    return {
      id: this.#id,
      amount: this.#amountScaled,
      unit: this.#unit,
      name: this.#grocery.name
    };
  }
}
