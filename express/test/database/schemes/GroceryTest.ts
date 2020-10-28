'use strict';

import test from 'ava';
import Grocery from '../../../src/database/schemes/Grocery';
import Section from '../../../src/database/schemes/Section';

const s = new Section(0, 'Vegtables');

test('Grocery: construction', t => {
  const g = new Grocery(5, 'carrots', s);
  t.assert(g.id === 5, 'id is correct');
  t.assert(g.name === 'carrots', 'name is correct');
  t.assert(g.section === s, 'section is correct');
});

test('Grocery: toJson()', t => {
  const g = new Grocery(5, 'carrots', s);
  const json = g.toJson();
  t.assert(json.id === 5, 'id is correct');
  t.assert(json.name === 'carrots', 'name is correct');
  t.assert(json.section === s, 'section is correct');
});
