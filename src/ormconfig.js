/**
 * TypeORM configuration for the Earthquake API.
 * Defines the database connection settings and paths for entities and migrations.
 */

module.exports = {
  type: 'sqlite',
  database: 'earthquake.db',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.js'],
  migrations: ['src/migration/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration'
  }
};
