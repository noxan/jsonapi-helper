export default class Schema {
  constructor(definition) {
    if (definition === undefined) {
      throw new Error('You have to provide a schema definition as parameter.');
    }
    this.definition = {
      id: definition.id || 'id',
      type: definition.type,
    };
  }

  serialize(obj) {
    return {
      links: {},
      data: {
        type: this.definition.type,
        id: obj[this.definition.id],
        attributes: {},
      }
    }
  }
}
