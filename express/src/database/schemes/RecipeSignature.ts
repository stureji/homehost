'use strict';

import {DataScheme, SchemeJSON} from './DataScheme';

export interface RecipeSignatureJSON extends SchemeJSON {
  id: number,
  name: string
}

export default class RecipeSignature implements DataScheme<RecipeSignatureJSON> {
  #id: number;
  #name: string;

  constructor(id: number, nameOfRecipe: string) {
    this.#id = id;
    this.#name = nameOfRecipe;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  display(): string {
    throw new Error("Method not implemented.");
  }

  toJson(): RecipeSignatureJSON {
    return {
      id: this.#id,
      name: this.#name
    }
  }
}
