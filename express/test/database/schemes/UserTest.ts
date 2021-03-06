'use strict';

import test from 'ava';
import User from '../../../src/database/schemes/User';
import Grocery from '../../../src/database/schemes/Grocery';
import Ingredient from '../../../src/database/schemes/Ingredient';
import Recipe from '../../../src/database/schemes/Recipe';
import Section from '../../../src/database/schemes/Section';
import ShoppingList from '../../../src/database/schemes/ShoppingList';


const cheeseSection = new Section(7, 'Ostar');
const breadSection = new Section(3, 'Bakat');
const greve = new Grocery(9, 'Grevé Ost', cheeseSection);
const bread = new Grocery(10, 'Brödlimpa', breadSection);
const breadI = new Ingredient(1, 1, 'skiva', bread);
const greveI = new Ingredient(2, 2, 'skiva', greve);
const sandwichIngredients = new Array(breadI, greveI);
const sandwichInstructions = "Skiva bröded i skivor. Sätt på osten och sedan tomaten på det skivade brödet för varje macka du önskar.";

test('UserTest: construction', t => {
  const user = new User(0, 'test');
  t.is(user.id, 0, 'expect passed values');
  t.is(user.username, 'test', 'expect passed values');
  t.is(user.shoppinglist.length, 0, 'shopping list is empty for new user');
});

test('UserTest: addRecipeToList()', t => {
  const user = new User(0, 'test');
  const recipe = new Recipe(2, 'Smörgås', sandwichIngredients, sandwichInstructions);
  const resList = recipe.toShoppingList();
  user.addRecipeToList(recipe);
  t.is(user.shoppinglist.length, resList.length, 'expect same length');
});

test('UserTest: clearCheckedItems()', t => {
  const user = new User(0, 'test');
  const recipe = new Recipe(2, 'Smörgås', sandwichIngredients, sandwichInstructions);
  user.addRecipeToList(recipe);
  t.is(user.shoppinglist.length, 2, 'should not be empty yet');
  const entry = user.shoppinglist.get(bread);
  if(entry) {
    entry.toggle();
  }
  user.clearCheckedItems();
  t.is(user.shoppinglist.length, 1, 'should be one unchecked now');
});

test('UserTest: clearList()', t => {
  const user = new User(0, 'test');
  const recipe = new Recipe(2, 'Smörgås', sandwichIngredients, sandwichInstructions);
  user.addRecipeToList(recipe);
  t.is(user.shoppinglist.length, 2, 'should not be empty yet');
  user.clearList()
  t.is(user.shoppinglist.length, 0, 'should be empty now');
});

test('UserTest: construct with shoplist', t => {
  const recipe = new Recipe(2, 'Smörgås', sandwichIngredients, sandwichInstructions);
  const list = recipe.toShoppingList();
  const user = new User(666, 'HungryBoy', list);
  t.is(user.shoppinglist.length, 2, 'should not be empty');
});

test('UserTest: display()', t => {
  const user = new User(0, 'test');
  t.is(user.display(), 'User: test', 'username should be displayed.')
});

test('UserTest: toJson()', t => {
  const user = new User(0, 'test');
  const recipe = new Recipe(2, 'Smörgås', sandwichIngredients, sandwichInstructions);
  user.addRecipeToList(recipe);
  const json = user.toJson();
  t.is(json.id, 0, 'should match userId');
  t.is(json.username, 'test', 'should match username');
  t.deepEqual(json.shoplist, new ShoppingList(sandwichIngredients).toJson(), 'should match shoplist');
});

