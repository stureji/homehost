'use strict';

import test from 'ava';
import Section from '../../../src/database/schemes/Section';

const id = 0;
const name = 'testname';

test('Section: construction', t => {
  const s1 = new Section(id, name);
  t.assert(s1.id === id, 'id is correct');
  t.assert(s1.name === name, 'name is correct');
  t.assert(s1.sort === Section.DEFAULT_SORT, 'sort is correct');
  const s2 = new Section(id, name, 999);
  t.assert(s2.id === id, 'id is correct');
  t.assert(s2.name === name, 'name is correct');
  t.assert(s2.sort === 999, 'sort is correct');
});

test('Section: set sort', t => {
  const s = new Section(id, name);
  const newSort = 10;
  t.assert(s.sort === Section.DEFAULT_SORT, 'should construct with defaul value');
  s.sort = newSort;
  t.assert(s.sort === newSort, 'should match with new value');
});

test('Section: compareTo()', t => {
  const ss = new Array();
  const otherSections = (s: Section, ss: Array<Section>) => {
    return ss.filter( x => s.id != x.id);
  }
  const s1 = new Section(1, 's1');
  const s2 = new Section(2, 's2');
  const s3 = new Section(3, 's3');
  const s4 = new Section(4, 's4');
  t.is(s1.sort, 1337, 'should construct with defaul value');
  t.is(s2.sort, 1337, 'should construct with defaul value');
  t.is(s3.sort, 1337, 'should construct with defaul value');
  t.is(s3.sort, 1337, 'should construct with defaul value');

  ss.push(s2);
  ss.push(s4);
  ss.push(s3);
  ss.push(s1);

  s1.sort = 1;
  s2.sort = 2;
  s3.sort = 3;

  ss.sort( (a: Section, b: Section) => a.compareTo(b));
  const ssString = ss.map(s => s.sort).join('');
  t.is(ssString, '1231337', 'expected ordering given sorting');
  t.is(ss[0].id, s1.id, 's1 expected to be first given sorting');
  t.is(ss[1].id, s2.id, 's2 expected to be second given sorting');
  t.is(ss[2].id, s3.id, 's3 expected to be third given sorting');
  t.is(ss[3].id, s4.id, 's4 expected to be last given sorting');
});

test('Section: toJson()', t => {
  const s = new Section(id, name);
  const json = s.toJson();
  t.assert(json.id === id, 'id is correct');
  t.assert(json.name === name, 'name is correct');
  t.assert(json.sort === Section.DEFAULT_SORT, 'sort is correct');
  s.sort = 61;
  const newJson = s.toJson();
  t.assert(newJson.id === id, 'id is correct');
  t.assert(newJson.name === name, 'name is correct');
  t.assert(newJson.sort === 61, 'sort has changed');
});
