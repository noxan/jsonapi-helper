import test from 'ava';

import Schema from '../src';


test('serialize complete basic object', async t => {
  const objs = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];

  const objSchema = new Schema({
    type: 'objs',
  });

  const result = objSchema.serialize(objs);

  t.is(result.data.length, 3);
});
