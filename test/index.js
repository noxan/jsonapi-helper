import test from 'ava';

import Schema from '../src';


test('schema object has serialize method', async t => {
  const schema = new Schema({});

  t.truthy(schema.serialize);
});

test('schema serialize returns an object', async t => {
  const schema = new Schema({});
  const result = schema.serialize({
    id: 1,
  });

  t.truthy(result);
  t.is(typeof result, "object");
});

test('schema serialize result should match basic jsonapi requirements', async t => {
  const schema = new Schema({});
  const result = schema.serialize({
    id: 1,
  });

  t.true('links' in result);
  t.true('data' in result);
  t.is(result.data.length, 1);
  t.true('id' in result.data[0]);
  t.true('type' in result.data[0]);
  t.true('attributes' in result.data[0]);
});

test('schema serialze should take at least 1 parameter', async t => {
  const schema = new Schema({});

  t.is(schema.serialize.length, 1);
});

test('schema serialize should have the proper id of the source obj', async t => {
  const schema = new Schema({});
  const result = schema.serialize({
    id: 5,
  });

  t.is(result.data[0].id, 5);
});

test('schema serialize should have the proper type of the schema', async t => {
  const schema = new Schema({
    type: 'objs',
  });
  const result = schema.serialize({
    id: 5,
  });

  t.is(result.data[0].type, 'objs');
});

test('schema serialize should have the proper type of the schema', async t => {
  const schema = new Schema({
    attributes: {
      name: 'NAME',
    },
  });
  const result = schema.serialize({
    NAME: 'Because strange api key format.',
  });

  t.is(typeof result.data[0].attributes, 'object');
  t.is(result.data[0].attributes.name, 'Because strange api key format.');
});
