'use strict';

import test from 'ava';
import Grocery from '../../classes/data/Grocery';
import Ingredient from '../../classes/data/Ingredient';
import Recipe from '../../classes/data/Recipe';
import Section from '../../classes/data/Section';
import ShoppingList from '../../classes/ShoppingList';

const meatSection = new Section(0, 'Kött');
const dairySection = new Section(1, 'Mejeri');
const dryFoodSection = new Section(2, 'Torr mat');
const spiceSection = new Section(5, 'Kryddhyllan');
const oilSection = new Section(6, 'Oljor');
const cheeseSection = new Section(7, 'Ostar');
const breadSection = new Section(3, 'Bakat');
const vegtableSection = new Section(4, 'Grönsaker');

const bacon = new Grocery(1, 'Bacon', meatSection);
const spaghetti = new Grocery(2, 'Spaghetti', dryFoodSection);
const egg = new Grocery(3, 'Ägg', dairySection);
const pepper = new Grocery(4, 'Svartpeppar', spiceSection);
const salt = new Grocery(5, 'Salt', spiceSection);
const oil = new Grocery(6, 'Olivolja', oilSection);
const parmesan = new Grocery(7, 'Parmesan Ost', cheeseSection);
const pecorino = new Grocery(8, 'Pecorino Ost', cheeseSection);
const greve = new Grocery(9, 'Grevé Ost', cheeseSection);
const bread = new Grocery(10, 'Brödlimpa', breadSection);
const tomato = new Grocery(11, 'Färska Tomater', vegtableSection);

const baconI = new Ingredient(200, 'g', bacon);
const spaghettiI = new Ingredient(400, 'g', spaghetti);
const eggI = new Ingredient(4, 'stycken', egg);
const pepperI = new Ingredient(0, 'nymalen efter smak', pepper);
const saltI = new Ingredient(0, 'till pastavatten', salt);
const oilI = new Ingredient(0, 'till stekning', oil);
const parmesanI = new Ingredient(150, 'g', parmesan);
const pecorinoI = new Ingredient(150, 'g', pecorino);
const breadI = new Ingredient(1, 'skiva', bread);
const tomatoI = new Ingredient(1, 'skiva', tomato);
const greveI = new Ingredient(2, 'skiva', greve);

const pastaCarbonaraIngredients = new Array(baconI, spaghettiI, eggI, pepperI, saltI, oilI, parmesanI, pecorinoI);
const sandwichIngredients = new Array(breadI, tomatoI, greveI);

const pastaCarbonaraInstructions = "Sätt på pastavattnet och salta rikligt. Pasta carbonara är en snabb rätt vilket betyder att när pastan väl är klar så måste vi kombinera allting snabbt. Därför, innan vi lägger i pastan så måste vi förbereda alla ingredienser. Finriv osten så att den blir väldigt lufitg och har lätt att smälta. I en skål, kläck ner ett helt egg samt egggulan av alla andra äggen. Vispa med en gaffel. Blanda osten tillsammans med äggblandningen och peppra med svartpeppar. Skär upp bacon i bitar. Lägg bacon tillsammans med lite oivolja i pannan, låt bacon värmas upp tillsammans med pannan upp till medel värme. När pastavattnet kokar så lägger du i pastan. Nu är det viktigt att du håller ett öga på bacon, vi vill inte steka sönder dem, så när de känns färdiga, ta bort från plattan och invänta pastan. När pastan är klar, dumpa pastan i ett durkslag men låt inte rinna av. Här måste du vara snabb. Ta pastan, som inte hunnit rinna av helt (du vill ha lite pastavatten tillsammans med pastan), och lägg de i pannan med bacon. Häll över äggblandningen och arbeta direkt. Du vill inte att ägget ska hinna koagulera, så du måste kasta pastan och arbeta in mycket luft för att hålla temperaturerna i kontroll. Servera.";
const sandwichInstructions = "Skiva bröded i skivor. Sätt på osten och sedan tomaten på det skivade brödet för varje macka du önskar.";

test('RecipeTest: construction', t => {
  const recipe = new Recipe(1337, 'Pasta Carbonara', pastaCarbonaraIngredients, pastaCarbonaraInstructions);
  t.is(recipe.id, 1337);
  t.is(recipe.name, 'Pasta Carbonara');
  t.deepEqual(recipe.ingredients, pastaCarbonaraIngredients, 'expected same ingredients');
  t.is(recipe.instructions, pastaCarbonaraInstructions);
});

test('RecipeTest: toShoppingList()', t => {
  const list = new ShoppingList();
  const recipe = new Recipe(0, 'Smörgås', sandwichIngredients, sandwichInstructions);
  list.add(bread);
  list.add(tomato);
  list.add(greve);
  const shoppingList = recipe.toShoppingList();
  t.is(list.list[0].grocery.name, shoppingList.list[0].grocery.name, 'constructed ShoppingList should be same as generated');
  t.is(list.list[1].grocery.name, shoppingList.list[1].grocery.name, 'constructed ShoppingList should be same as generated');
  t.is(list.list[2].grocery.name, shoppingList.list[2].grocery.name, 'constructed ShoppingList should be same as generated');
  t.is(new ShoppingList().length, new Recipe(0, 'empty', new Array<Ingredient>(), 'empty').toShoppingList().length, 'empty should be empty')
});

test('RecipeTest: scale()', t => {
  const recipe = new Recipe(0, 'Smörgås', sandwichIngredients, sandwichInstructions);
  recipe.scale(2.0);
  t.deepEqual(recipe.ingredients.map( i => i.amount), [2, 2, 4], 'expect ingredients to scale');
  recipe.scale(1.0);
  t.deepEqual(recipe.ingredients.map( i => i.amount), [1, 1, 2], 'expect ingredients to scale back');
  recipe.scale(0);
  t.deepEqual(recipe.ingredients.map( i => i.amount), [0, 0, 0], 'expect ingredients to be 0');
});

test('RecipeTest: toJson()', t => {
  const recipe = new Recipe(0, 'Pasta Carbonara', pastaCarbonaraIngredients, pastaCarbonaraInstructions);
  const json = recipe.toJson();
  t.is(json.id, 0, 'expect name to transfer');
  t.is(json.name, 'Pasta Carbonara', 'expect name to transfer');
  t.is(json.instructions,  pastaCarbonaraInstructions, 'instructions name to transfer');
  t.is(json.ingredients[0].name, 'Bacon', 'expect name to transfer');
  t.is(json.ingredients[0].amount, 200, 'expect amount to transfer');
  t.is(json.ingredients[0].unit, 'g', 'expect unit to transfer');
});
