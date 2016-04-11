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

      if (typeof source === 'function') {
        attributes[targetKey] = source(obj);
      } else {
        attributes[targetKey] = obj[source];
      }
    });

    return {
      type: this.definition.type,
      id: obj[this.definition.id],
      attributes: attributes,
    }
  }

  serialize(obj) {
    return {
      links: {},
      data: [
        this.serializeObj(obj),
      ],
    }
  }
}
