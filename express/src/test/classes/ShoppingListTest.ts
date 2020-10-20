'use strict';

import test from 'ava';
import Grocery from '../../classes/data/Grocery';
import Section from '../../classes/data/Section';
import ShoppingList from '../../classes/ShoppingList';
import ShoppingListEntry from '../../classes/ShoppingListEntry';

const pastaSection = new Section(2, 'Pastas');
pastaSection.sort = 2; // sort == id in tests for simplicity
const vegtableSection = new Section(4, 'Vegtables');
vegtableSection.sort = 4;
const cheeseSection = new Section(7, 'Cheeses');
cheeseSection.sort = 7;
const greve = new Grocery(9, 'Grevé Cheese', cheeseSection);
const parmesan = new Grocery(7, 'Parmesan Cheese', cheeseSection);
const pecorino = new Grocery(8, 'Pecorino Cheese', cheeseSection);
const spaghetti = new Grocery(2, 'Spaghetti', pastaSection);
const tomatoes = new Grocery(11, 'Tomatoes', vegtableSection);

test('ShoppingList: construction', t => {
  const list = new ShoppingList();
  t.truthy(list.list, 'starts off with empty list');
  t.is(list.length, 0, 'starts off with empty list');
});

test('ShoppingList: add()', t => {
  const list = new ShoppingList();
  list.add(tomatoes);
  t.is(list.length, 1, 'length should update after addition');
  t.is(list.list[0].grocery.name, 'Tomatoes', 'Spaghetti should be the inserted grocery');
  list.add(spaghetti);
  t.is(list.length, 2, 'length should update after addition');
  t.is(list.list[0].grocery.name, 'Spaghetti', 'add() should sort based on section');
  t.is(list.list[1].grocery.name, 'Tomatoes', 'add() should sort based on section');
});

test('ShoppingList: sort()', t => {
  const list = new ShoppingList();
  list.list.push(new ShoppingListEntry(tomatoes));
  list.list.push(new ShoppingListEntry(spaghetti));
  t.is(list.list[0].grocery.name, 'Tomatoes', 'bypassing the add() should not sort');
  t.is(list.list[1].grocery.name, 'Spaghetti', 'bypassing the ad() should not sort');
  list.sort();
  t.is(list.list[0].grocery.name, 'Spaghetti', 'List should sort based on section');
  t.is(list.list[1].grocery.name, 'Tomatoes', 'List should sort based on section');
});

test('ShoppingList: merge() two differet lists', t => {
  const list1 = new ShoppingList();
  const list2 = new ShoppingList();
  list1.add(spaghetti);
  list1.add(tomatoes);
  list2.add(parmesan);
  list2.add(pecorino);
  list2.add(greve);
  const merged = list1.merge(list2);
  const degrem = list2.merge(list1);
  t.not(merged, undefined, 'merge should be successful!');
  t.not(degrem, undefined, 'merge should be successful!');
  if(merged == undefined) { t.fail("merge is undefined!"); return;}
  if(degrem == undefined) { t.fail("merge is undefined!"); return;}
  t.is(merged.length, 5, 'expected length after merging');
  t.is(merged.list.map(x => x.grocery.name[0]).join(''), 'STGPP', 'expected section ordering after merge');
  t.is(merged.list.map(x => x.grocery.section.id).join(''), '24777', 'expected section ordering after merge');
  t.is(merged.list[0].grocery.name, 'Spaghetti', 'should be sorted after merge');
  t.is(merged.list[1].grocery.name, 'Tomatoes', 'should be sorted after merge');
  t.is(merged.list[2].grocery.name, 'Grevé Cheese', 'should be sorted after merge');
  t.is(merged.list[3].grocery.name, 'Parmesan Cheese', 'should be sorted after merge');
  t.is(merged.list[4].grocery.name, 'Pecorino Cheese', 'should be sorted after merge');
  t.deepEqual(merged, degrem, 'order not important');
});

test('ShoppingList: merge() two equal lists', t => {
  const list1 = new ShoppingList();
  const list2 = new ShoppingList();
  list1.add(spaghetti);
  list1.add(tomatoes);
  list1.add(parmesan);
  list2.add(spaghetti);
  list2.add(tomatoes);
  list2.add(parmesan);
  const merged = list1.merge(list2);
  const degrem = list2.merge(list1);
  t.not(merged, undefined, 'merge should be successful!');
  t.not(degrem, undefined, 'merge should be successful!');
  if(merged == undefined) { t.fail("merge is undefined!"); return;}
  if(degrem == undefined) { t.fail("merge is undefined!"); return;}
  t.is(merged.length, 6, 'expected length after merging');
  t.is(merged.list.map(x => x.grocery.name[0]).join(''), 'SSTTPP', 'expected section ordering after merge');
  t.is(merged.list.map(x => x.grocery.section.id).join(''), '224477', 'expected section ordering after merge');
  t.is(merged.list[0].grocery.name, 'Spaghetti', 'should be sorted after merge');
  t.is(merged.list[1].grocery.name, 'Spaghetti', 'should be sorted after merge');
  t.is(merged.list[2].grocery.name, 'Tomatoes', 'should be sorted after merge');
  t.is(merged.list[3].grocery.name, 'Tomatoes', 'should be sorted after merge');
  t.is(merged.list[4].grocery.name, 'Parmesan Cheese', 'should be sorted after merge');
  t.is(merged.list[5].grocery.name, 'Parmesan Cheese', 'should be sorted after merge');
  t.deepEqual(merged, degrem, 'order not important');
});

test('ShoppingList: merge() one list is undefined', t => {
  const list1 = new ShoppingList();
  const list2 = new ShoppingList();
  const merged = list1.merge(list2);
  const degrem = list2.merge(list1);
  t.is(merged, undefined, 'merge should fail!');
  t.is(degrem, undefined, 'merge should fail!');
  t.deepEqual(merged, degrem, 'order not important');
});

test('ShoppingList: merge() one list is empty', t => {
  const list1 = new ShoppingList();
  const list2 = new ShoppingList();
  list1.add(spaghetti);
  list1.add(tomatoes);
  const merged = list1.merge(list2);
  const degrem = list2.merge(list1);
  t.not(merged, undefined, 'merge should be successful!');
  t.not(degrem, undefined, 'merge should be successful!');
  if(merged == undefined) { t.fail("merge is undefined!"); return;}
  if(degrem == undefined) { t.fail("merge is undefined!"); return;}
  t.is(merged.length, 2, 'expected length after merging');
  t.is(merged.list.map(x => x.grocery.name[0]).join(''), 'ST', 'expected section ordering after merge');
  t.is(merged.list.map(x => x.grocery.section.id).join(''), '24', 'expected section ordering after merge');
  t.deepEqual(merged, degrem, 'order not important');
});

test('ShoppingList: remove()', t => {
  const list = new ShoppingList();
  list.add(spaghetti);
  list.add(tomatoes);
  t.is(list.length, 2, 'expected length after adding');
  t.is(list.remove(parmesan), false, 'parmesan is not in the list...');
  t.is(list.length, 2, 'expected length removing missing');
  t.is(list.remove(spaghetti), true, 'spaghetti is in the list...');
  t.is(list.length, 1, 'expected length removing spaghetti');
  t.is(list.remove(new Grocery(11, 'Tomatoes', vegtableSection)), true, 'tomatoes is in the list...');
  t.is(list.length, 0, 'expected length removing tomatoes');
});

test('ShoppingList: display()', t => {
  const list = new ShoppingList();
  list.add(spaghetti);
  list.add(tomatoes);
  const display = list.display();
  t.is(display, '[ ]: Spaghetti\n[ ]: Tomatoes', 'pretty display of list');
  list.add(parmesan);
  list.remove(tomatoes);
  list.list[0].toggle();
  const displayChanges = list.display();
  t.is(displayChanges, '[x]: Spaghetti\n[ ]: Parmesan Cheese', 'pretty display of list');
});

test('ShoppingList: toJson()', t => {
  const list = new ShoppingList();
  list.add(spaghetti);
  list.add(tomatoes);
  const json = list.toJson();
  t.is(json[0].checked, false, 'expecting false check marks');
  t.is(json[1].checked, false, 'expecting false check marks');
  t.is(json[0].grocery, 'Spaghetti', 'expecting Spaghetti name');
  t.is(json[1].grocery, 'Tomatoes', 'expecting Tomatoes name');
  list.add(parmesan);
  list.remove(tomatoes);
  list.list[1].toggle();
  const mutedJson = list.toJson();
  t.is(mutedJson[0].checked, false, 'expecting false check mark');
  t.is(mutedJson[1].checked, true, 'expecting ture check mark');
  t.is(mutedJson[0].grocery, 'Spaghetti', 'expecting Spaghetti name');
  t.is(mutedJson[1].grocery, 'Parmesan Cheese', 'expecting Parmesan Cheese name');
});
