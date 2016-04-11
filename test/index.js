import test from 'ava';

import Schema from '../src';


test('schema object has serialize method', async t => {
  const schema = new Schema();

  t.truthy(schema.serialize);
});

test('schema serialize returns an object', async t => {
  const schema = new Schema();
  const result = schema.serialize();

  t.truthy(result);
  t.is(typeof result, "object");
});
