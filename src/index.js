export default class Schema {
  constructor(definition) {
    if (definition === undefined) {
      throw new Error('You have to provide a schema definition as parameter.');
    }
  }

  serialize(obj) {
    return {
      id: '',
      links: {},
      attributes: {},
    }
  }
}
