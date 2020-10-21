'use strict';

import test from 'ava';
import ServerResponse from '../../src/classes/ServerResponse';
import { DataScheme, SchemeJSON } from '../../src/classes/data/DataScheme';

interface TestJSON extends SchemeJSON {
  id: number,
  value: string
}

class TestData implements DataScheme<TestJSON> {
  #id: number;
  #value: string;

  constructor(id: number, value: string) {
    this.#id = id;
    this.#value = value;
  }

  get id() {
    return this.#id;
  }

  get value() {
    return this.#value;
  }

  display() { return '' };

  toJson():TestJSON { return { id: this.#id, value: this.#value }; }
}

test('ServerResponse: constructed bar request default', t => {
  const res = new ServerResponse();
  t.is(res.json.status, 400, 'expecting bad request response code');
  t.is(res.json.message, 'BAD_REQUEST', 'expecting BAD_REQUEST');
  t.is(res.json.data, undefined, 'expect undefined');
  t.is(res.json.error, undefined, 'expect undefined');
});

test('ServerResponse: adding [] data to request', t => {
  const res = new ServerResponse();
  const td1: DataScheme<SchemeJSON>[] = [];
  res.data = td1;
  t.is(res.json.status, 200, 'expecting OK response code');
  t.is(res.json.message, 'OK', 'expecting OK');
  t.deepEqual(res.json.data, [], 'expect deep equality to passed value');
  t.is(res.json.error, undefined, 'expect undefined');
});

test('ServerResponse: adding one data to request', t => {
  const res = new ServerResponse();
  const td1 = new TestData(0, 'test')
  res.data = [td1];
  t.is(res.json.status, 200, 'expecting OK response code');
  t.is(res.json.message, 'OK', 'expecting OK');
  t.deepEqual(res.json.data, [td1.toJson()], 'expect deep equality to passed value');
  if(res.json.data == undefined) {
    t.fail('should not be undefined')
    return;
  }
  t.is(res.json.data.length, 1, 'one element');
  t.deepEqual(res.json.data[0], {id: 0, value: 'test'}, 'expect deep equality to this json literal');
  t.is(res.json.error, undefined, 'expect undefined');
});

test('ServerResponse: adding null to request', t => {
  const res = new ServerResponse();
  res.data = null;
  t.is(res.json.status, 204, 'expecting no content code');
  t.is(res.json.message, 'NO_CONTENT', 'expecting NO_CONTENT');
  t.is(res.json.data, undefined, 'expect undefined');
  t.is(res.json.error, undefined, 'expect undefined');
});

test('ServerResponse: adding undefined to request', t => {
  const res = new ServerResponse();
  res.data = undefined;
  t.is(res.json.status, 204, 'expecting no content code');
  t.is(res.json.message, 'NO_CONTENT', 'expecting NO_CONTENT');
  t.is(res.json.data, undefined, 'expect undefined');
  t.is(res.json.error, undefined, 'expect undefined');
});
