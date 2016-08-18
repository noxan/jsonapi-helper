import test from 'ava';

import Schema from '../src';

const objSchema = new Schema({
  type: 'objs',
  relationships: {
    elements: {
      type: 'somethings',
      id: el => el.name,
    }
  },
});

const objSchema2 = new Schema({
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


test('serialize complete object with relationship', async t => {
  const obj = {
    ID: '5',
    NaMe: 'Hello',
    mountains: [3, 7],
  };

  const result = objSchema2.serialize(obj);

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

test('serialize relationship with id resolve function', async t => {
  const obj = {
    id: '5',
    elements: [
      { name: 'tdcaw' },
      { name: 'oyqm' }
    ],
  };

  const result = objSchema.serialize(obj);

  t.deepEqual(result.data.relationships.elements.data, [
    { type: 'somethings', id: 'tdcaw' },
    { type: 'somethings', id: 'oyqm' }
  ]);
});

test('serialize relationship with single object as array', async t => {
  const obj = {
    id: '5',
    elements: [
      { name: 'tdcaw' }
    ],
  };

  const result = objSchema.serialize(obj);

  t.deepEqual(result.data.relationships.elements.data, [{ type: 'somethings', id: 'tdcaw' }]);
});

test('serialize relationship with single plain object', async t => {
  const obj = {
    id: '5',
    elements: { name: 'tdcaw' },
  };

  const result = objSchema.serialize(obj);

  t.deepEqual(result.data.relationships.elements.data, { type: 'somethings', id: 'tdcaw' });
});

test('serialize relationship without objects', async t => {
  const obj = {
    id: '5',
    elements: [],
  };

  const result = objSchema.serialize(obj);

  t.deepEqual(result.data.relationships.elements.data, []);
});

test('serialize relationship without defined key in object', async t => {
  const obj = {
    id: '5',
  };

  const result = objSchema.serialize(obj);

  t.deepEqual(result.data.relationships.elements.data, []);
});

test('serialize relationship without defined key in object', async t => {
  const obj = {
    id: '5',
    imageId: 4,
  };

  const objSchema3 = new Schema({
    type: 'objs',
    relationships: {
      image: {
        type: 'images',
        id: (obj, parentObj) => parentObj.imageId,
      }
    },
  });

  const result = objSchema3.serialize(obj);

  t.deepEqual(result.data.relationships.image.data, {
    type: 'images',
    id: 4,
  });
});
