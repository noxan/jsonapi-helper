import test from 'ava';

import Schema from '../src';


test('schema object has serialize method', async t => {
  const schema = new Schema({
    attributes: {
      name: (obj) => `${obj.firstName} ${obj.lastName}`,
    }
  });
  const result = schema.serialize({
    firstName: 'Hello',
    lastName: 'World',
  });

  t.is(result.data[0].attributes.name, 'Hello World');
});
