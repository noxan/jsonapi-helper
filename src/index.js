export default class Schema {
  constructor(definition) {
    if (definition === undefined) {
      throw new Error('You have to provide a schema definition as parameter.');
    }
    this.definition = {
      id: definition.id || 'id',
    };
  }

  serialize(obj) {
    return {
      links: {},
      data: {
        type: '',
        id: obj[this.definition.id],
        attributes: {},
      }
    }
  }
}
