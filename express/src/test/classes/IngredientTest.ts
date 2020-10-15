'use strict';

import test from 'ava';
import Grocery from '../../classes/Grocery';
import Ingredient from '../../classes/Ingredient';
import Section from '../../classes/Section';

const vegtableSection = new Section(0, 'Vegtables');
const carrot = new Grocery('Carrots', vegtableSection);

test('Ingredient: construction', t => {
  const i = new Ingredient(5, 'pices', carrot);
  t.assert(i.amount === 5, 'amount is correct');
  t.assert(i.unit === 'pices', 'unit is correct');
  t.assert(i.grocery.name === 'Carrots', 'gorcery name is correct');
  t.assert(i.grocery.section === vegtableSection, 'section is correct');
  t.assert(i.grocery === carrot, 'grocery is correct');
  t.pass("Construction successful!");
});

test('Ingredient: scale()', t => {
  const passedAmount = 5;
  const i = new Ingredient(passedAmount, 'pices', carrot);
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
  const i = new Ingredient(passedAmount, passedUnit, carrot);
  t.is(i.display(), passedAmount + ' ' + passedUnit + ' ' + passedName, 'display should be nice');
  const scaledAmount = i.scale(scalar);
  t.is(i.display(), scaledAmount + ' ' + passedUnit + ' ' + passedName, 'display should represent content');
});

test('Ingredient: display() when amount is zero', t => {
  const oo = new Ingredient(0, 'for frying', new Grocery('Olive Oil', vegtableSection));
  const salt = new Ingredient(0, 'to taste', new Grocery('Salt', vegtableSection));
  t.is(oo.display(), 'Olive Oil for frying', 'different display when amount is zero')
  t.is(salt.display(), 'Salt to taste', 'different display when amount is zero')
})

test('Ingredient: toJson()', t => {
  const passedAmount = 5;
  const passedUnit = 'pices';
  const passedName = carrot.name;
  const scalar = 10;
  const i = new Ingredient(passedAmount, passedUnit, carrot);
  const json = i.toJson();
  t.assert(json.name === passedName, 'name from json should match passed value');
  t.assert(json.amount === passedAmount, 'amount from json should match passed value');
  t.assert(json.unit === passedUnit, 'unit from json should match passed value');
  const scaledAmount = i.scale(scalar);
  const scaledJson = i.toJson();
  t.assert(scaledJson.name === passedName, 'name from scaledJson should match passed value');
  t.assert(scaledJson.amount === scaledAmount, 'amount from scaledJson should match new value');
  t.assert(scaledJson.unit === passedUnit, 'unit from scaledJson should match passed value');
});
