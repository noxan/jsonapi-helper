import test from 'ava';

import Schema from '../src';


test('serialize complete basic object', async t => {
  const obj = {
    ID: '5',
    NaMe: 'Hello',
  };

  const objSchema = new Schema({
    id: 'ID',
    type: 'objs',
    attributes: {
      name: 'NaMe',
    }
  });

  const result = objSchema.serialize(obj);

  t.deepEqual(result, {
    links: {},
    data: [{
      type: 'objs',
      id: '5',
      attributes: { name: 'Hello' }
    }],
  });
});
