'use strict';

import {DataScheme, SchemeJSON} from './DataScheme.js';

export interface GrocerySignatureJSON extends SchemeJSON {
  id: number,
  name: string
}

export default class GrocerySignature implements DataScheme<GrocerySignatureJSON> {
  #id: number;
  #name: string;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
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

  toJson(): GrocerySignatureJSON {
    return {
      id: this.#id,
      name: this.#name
    }
  }
}
