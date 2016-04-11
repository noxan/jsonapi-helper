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

  serialize(obj) {
    const attributes = {};

    Object.keys(this.definition.attributes).forEach(targetKey => {
      const sourceKey = this.definition.attributes[targetKey];
      attributes[targetKey] = obj[sourceKey];
    });

    return {
      links: {},
      data: {
        type: this.definition.type,
        id: obj[this.definition.id],
        attributes: attributes,
      }
    }
  }
}
