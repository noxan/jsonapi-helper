import camelCaseToDashed from './camel-case-to-dashed';


export default class Schema {
  constructor(definition) {
    if (definition === undefined) {
      throw new Error('You have to provide a schema definition as parameter.');
    }
    this.definition = {
      id: definition.id || 'id',
      type: definition.type,
      attributes: definition.attributes || {},
    };
  }

  serializeObj(obj) {
    const attributes = {};

    Object.keys(this.definition.attributes).forEach(targetKey => {
      const source = this.definition.attributes[targetKey];
      const target = camelCaseToDashed(targetKey);

      if (typeof source === 'function') {
        attributes[target] = source(obj);
      } else {
        attributes[target] = obj[source];
      }
    });

    return {
      type: this.definition.type,
      id: obj[this.definition.id],
      attributes: attributes,
    };
  }

  serialize(objectOrArray) {
    const data = [];

    if (objectOrArray.length === undefined) {
      data.push(this.serializeObj(objectOrArray));
    } else {
      objectOrArray.forEach(obj => {
        data.push(this.serializeObj(obj));
      });
    }

    return {
      links: {},
      data: data,
    }
  }
}
