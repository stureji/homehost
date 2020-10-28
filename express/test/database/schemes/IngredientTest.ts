'use strict';

import test from 'ava';
import Grocery from '../../../src/database/schemes/Grocery';
import Ingredient from '../../../src/database/schemes/Ingredient';
import Section from '../../../src/database/schemes/Section';

const vegtableSection = new Section(0, 'Vegtables');
const carrot = new Grocery(12, 'Carrots', vegtableSection);

test('Ingredient: construction', t => {
  const i = new Ingredient(1, 5, 'pices', carrot);
  t.assert(i.id === 1, 'id is correct');
  t.assert(i.amount === 5, 'amount is correct');
  t.assert(i.unit === 'pices', 'unit is correct');
  t.assert(i.grocery.name === 'Carrots', 'gorcery name is correct');
  t.assert(i.grocery.section === vegtableSection, 'section is correct');
  t.assert(i.grocery === carrot, 'grocery is correct');
  t.pass("Construction successful!");
});

test('Ingredient: scale()', t => {
  const passedAmount = 5;
  const i = new Ingredient(1, passedAmount, 'pices', carrot);
  const scalar = 2;
  const scaledAmount = i.scale(scalar);
  t.assert(scaledAmount === 10, 'return value should be new scale');
  t.assert(i.amount === passedAmount * scalar, 'scale() method should mutate object');
  t.assert(i.scale(scalar) === passedAmount * scalar, 'scale() method should scale based on original amount');
  t.assert(i.scale(0) === 0, 'scaling with 0 allowed and should be 0');
  t.assert(i.scale(1) === passedAmount, 'scaling by one should return original amount');
});

test('Ingredient: display()', t => {
  const passedAmount = 5;
  const passedUnit = 'pices';
  const passedName = carrot.name;
  const scalar = 10;
  const i = new Ingredient(1, passedAmount, passedUnit, carrot);
  t.is(i.display(), passedAmount + ' ' + passedUnit + ' ' + passedName, 'display should be nice');
  const scaledAmount = i.scale(scalar);
  t.is(i.display(), scaledAmount + ' ' + passedUnit + ' ' + passedName, 'display should represent content');
});

test('Ingredient: display() when amount is zero', t => {
  const oo = new Ingredient(1, 0, 'for frying', new Grocery(5, 'Olive Oil', vegtableSection));
  const salt = new Ingredient(2, 0, 'to taste', new Grocery(6, 'Salt', vegtableSection));
  t.is(oo.display(), 'Olive Oil for frying', 'different display when amount is zero')
  t.is(salt.display(), 'Salt to taste', 'different display when amount is zero')
})

test('Ingredient: toJson()', t => {
  const passedId = 1337;
  const passedAmount = 5;
  const passedUnit = 'pices';
  const passedName = carrot.name;
  const scalar = 10;
  const i = new Ingredient(passedId, passedAmount, passedUnit, carrot);
  const json = i.toJson();
  t.assert(json.id === passedId, 'id from json should match passed value');
  t.assert(json.name === passedName, 'name from json should match passed value');
  t.assert(json.amount === passedAmount, 'amount from json should match passed value');
  t.assert(json.unit === passedUnit, 'unit from json should match passed value');
  const scaledAmount = i.scale(scalar);
  const scaledJson = i.toJson();
  t.assert(json.id === passedId, 'id from json should match passed value');
  t.assert(scaledJson.name === passedName, 'name from scaledJson should match passed value');
  t.assert(scaledJson.amount === scaledAmount, 'amount from scaledJson should match new value');
  t.assert(scaledJson.unit === passedUnit, 'unit from scaledJson should match passed value');
});
