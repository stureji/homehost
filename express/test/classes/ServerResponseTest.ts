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
  const response = new ServerResponse();
  const res = response.json;
  t.is(res.status, 400, 'expecting bad request response code');
  t.is(res.message, 'BAD_REQUEST', 'expecting BAD_REQUEST');
  t.is(res.data, undefined, 'expect undefined');
  t.is(res.error, undefined, 'expect undefined');
  t.is(JSON.stringify(res), '{"status":400,"message":"BAD_REQUEST"}', 'stringify equal to expected');
});

test('ServerResponse: adding [] data to request', t => {
  const response = new ServerResponse();
  const td1: DataScheme<SchemeJSON>[] = [];
  response.data = td1;
  const res = response.json;
  t.is(res.status, 200, 'expecting OK response code');
  t.is(res.message, 'OK', 'expecting OK');
  t.deepEqual(res.data, [], 'expect deep equality to passed value');
  t.is(res.error, undefined, 'expect undefined');
  t.is(JSON.stringify(res), '{"status":200,"message":"OK","data":[]}', 'stringify equal to expected');
});

test('ServerResponse: adding one data to request', t => {
  const response = new ServerResponse();
  const td1 = new TestData(0, 'test')
  response.data = [td1];
  const res = response.json;
  t.is(res.status, 200, 'expecting OK response code');
  t.is(res.message, 'OK', 'expecting OK');
  t.deepEqual(res.data, [td1.toJson()], 'expect deep equality to passed value');
  if(res.data == undefined) {
    t.fail('should not be undefined')
    return;
  }
  t.is(res.data.length, 1, 'one element');
  t.deepEqual(res.data[0], {id: 0, value: 'test'}, 'expect deep equality to this json literal');
  t.is(res.error, undefined, 'expect undefined');
  t.is(JSON.stringify(res), '{"status":200,"message":"OK","data":[{"id":0,"value":"test"}]}', 'stringify equal to expected');
});

test('ServerResponse: adding null to request', t => {
  const response = new ServerResponse();
  response.data = null;
  const res = response.json;
  t.is(res.status, 204, 'expecting no content code');
  t.is(res.message, 'NO_CONTENT', 'expecting NO_CONTENT');
  t.is(res.data, undefined, 'expect undefined');
  t.is(res.error, undefined, 'expect undefined');
  t.is(JSON.stringify(res), '{"status":204,"message":"NO_CONTENT"}', 'stringify equal to expected');
});

test('ServerResponse: adding undefined to request', t => {
  const response = new ServerResponse();
  response.data = undefined;
  const res = response.json;
  t.is(res.status, 204, 'expecting no content code');
  t.is(res.message, 'NO_CONTENT', 'expecting NO_CONTENT');
  t.is(res.data, undefined, 'expect undefined');
  t.is(res.error, undefined, 'expect undefined');
  t.is(JSON.stringify(res), '{"status":204,"message":"NO_CONTENT"}', 'stringify equal to expected');
});

test('ServerResponse: sending 404 code', t => {
  const response = new ServerResponse();
  /* Use case: some logic goes here, try to fetch from DB */
  /* But the SQL query returned no rows! */
  response.data = [];
  /* Lets override code to 404 and return */
  response.status = 404;
  const res = response.json;
  t.is(res.status, 404, 'expecting not found code');
  t.is(res.message, 'NOT_FOUND', 'expecting NOT_FOUND');
  t.is(res.data, undefined, 'expect undefined');
  t.is(res.error, undefined, 'expect undefined');
  t.is(JSON.stringify(res), '{"status":404,"message":"NOT_FOUND"}', 'stringify equal to expected');
});
