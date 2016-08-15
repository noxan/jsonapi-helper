import test from 'ava';

import Schema from '../src';

test('serialize complete object with relationship', async t => {
  const obj = {
    ID: '5',
    NaMe: 'Hello',
    mountains: [3, 7],
  };

  const objSchema = new Schema({
    id: 'ID',
    type: 'objs',
    attributes: {
      name: 'NaMe',
    },
    relationships: {
      mountains: {
        type: 'mountains',
        id: el => el,
      }
    },
  });

  const result = objSchema.serialize(obj);

  t.deepEqual(result, {
    links: {},
    data: {
      type: 'objs',
      id: '5',
      attributes: { name: 'Hello' },
      relationships: {
        mountains: {
          data: [
            { type: 'mountains', id: 3 },
            { type: 'mountains', id: 7 },
          ]
        }
      }
    },
  });
});
