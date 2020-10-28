'use strict';

import test from 'ava';

import Grocery from '../../../src/database/schemes/Grocery';
import Section from '../../../src/database/schemes/Section';
import ShoppingListEntry from '../../../src/database/schemes/ShoppingListEntry';

const tomato = new Grocery(11, 'Tomatoes', new Section(0, ''));

test('ShopingListEntry: construction()', t => {
  const entry = new ShoppingListEntry(tomato);
  t.assert(entry.checked === false, 'new entry is false');
  t.assert(entry.grocery === tomato, 'should save the paassed object');
});

test('ShopingListEntry: toggle()', t => {
  const entry = new ShoppingListEntry(tomato);
  t.assert(entry.toggle() === true, 'returns new toggle value');
  t.assert(entry.toggle() === false, 'returns new toggle value');
});

test('ShopingListEntry: display()', t => {
  const entry = new ShoppingListEntry(tomato);
  t.is(entry.display(), '[ ]: Tomatoes', 'correct display string');
  t.assert(entry.toggle() === true, 'returns new toggle value');
  t.is(entry.display(), '[x]: Tomatoes', 'display should represent changes');
});



test('ShopingListEntry: toJson()', t => {
  const entry = new ShoppingListEntry(tomato);
  const json = entry.toJson();
  t.is(json.checked, false, 'checked from json should match passed value');
  t.is(json.grocery, 'Tomatoes', 'grocery from json should match passed value');
  t.assert(entry.toggle() === true, 'returns new toggle value');
  const jsonToggeled = entry.toJson();
  t.is(jsonToggeled.checked, true, 'checked from json should match passed value');
  t.is(jsonToggeled.grocery, 'Tomatoes', 'grocery from json should match passed value');
});
