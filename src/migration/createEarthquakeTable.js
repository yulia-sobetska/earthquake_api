/**
 * Defines the schema for the Earthquake table with columns: id, latitude, longitude, magnitude,
 * and date.
 */

const { Table, QueryRunner } = require('typeorm');

module.exports = class CreateEarthquakeTable {
  /**
   * Apply the migration to create the Earthquake table.
   *
   * @param {QueryRunner} queryRunner - the TypeORM query runner
   */
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'earthquake',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'latitude',
            type: 'float'
          },
          {
            name: 'longitude',
            type: 'float'
          },
          {
            name: 'magnitude',
            type: 'float'
          },
          {
            name: 'date',
            type: 'date'
          }
        ]
      })
    );
  }

  /**
   * Revert the migration by dropping the Earthquake table.
   *
   * @param {QueryRunner} queryRunner - the TypeORM query runner
   */
  async down(queryRunner) {
    await queryRunner.dropTable('earthquake');
  }
};
