'use strict';

import test from 'ava';
import Section from '../../../classes/data/Section';

const id = 0;
const name = 'testname';

test('Section: construction', t => {
  const s = new Section(id, name);
  t.is(s.id, id, 'id should match passed value');
  t.is(s.name, name, 'name should match passed value');
  t.is(s.sort, 1337, 'should construct with defaul value');
});

test('Section: set sort', t => {
  const s = new Section(id, name);
  const newSort = 10;
  t.is(s.sort, 1337, 'should construct with defaul value');
  s.sort = newSort;
  t.is(s.sort, newSort, 'should match with new value');
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
