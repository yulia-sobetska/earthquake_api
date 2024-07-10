/**
 * Defines the columns and their types for the Earthquake table.
 */

const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Earthquake',
  tableName: 'earthquake',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    },
    magnitude: {
      type: 'float'
    },
    date: {
      type: 'date'
    }
  }
});
