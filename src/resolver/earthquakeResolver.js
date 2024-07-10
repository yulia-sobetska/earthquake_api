/**
 * Implements the logic for fetching, creating, updating, and deleting Earthquake data.
 */

const { DataSource } = require('typeorm');
const Earthquake = require('../entity/Earthquake.js');
const config = require('../ormconfig.js');

const AppDataSource = new DataSource(config);

/**
 * Resolver functions for handling Earthquake-related operations.
 */
const resolvers = {
  Query: {
    /**
     * Fetches all earthquake records from the database.
     *
     * @returns {Promise<Array<Earthquake>>} - a promise that resolves to an array of Earthquake entities
     */
    GetEarthquakes: async () => {
      await AppDataSource.initialize();
      const earthquakeRepository = AppDataSource.getRepository(Earthquake);
      const earthquakes = await earthquakeRepository.find();
      await AppDataSource.destroy();
      return earthquakes;
    }
  },
  Mutation: {
    /**
     * Creates a new earthquake record in the database.
     *
     * @param {Object} _ - unused parameter, required by GraphQL
     * @param {number} latitude - the latitude of the earthquake
     * @param {number} longitude - the longitude of the earthquake
     * @param {number} magnitude - the magnitude of the earthquake
     * @param {string} date - the date of the earthquake
     * @returns {Promise<Earthquake>} - a promise that resolves to the newly created Earthquake entity.
     */
    CreateEarthquake: async (_, { latitude, longitude, magnitude, date }) => {
      await AppDataSource.initialize();
      const earthquakeRepository = AppDataSource.getRepository(Earthquake);
      const earthquake = new Earthquake();
      earthquake.latitude = latitude;
      earthquake.longitude = longitude;
      earthquake.magnitude = magnitude;
      earthquake.date = new Date(date);
      const savedEarthquake = await earthquakeRepository.save(earthquake);
      await AppDataSource.destroy();
      return savedEarthquake;
    },

    /**
     * Updates an existing earthquake record in the database.
     *
     * @param {Object} _ - unused parameter, required by GraphQL
     * @param {number} id - the ID of the earthquake to update
     * @param {number} latitude - the latitude of the earthquake
     * @param {number} longitude - the longitude of the earthquake
     * @param {number} magnitude - the new magnitude of the earthquake
     * @param {string} date - the new date of the earthquake
     * @returns {Promise<Earthquake>} - a promise that resolves to the updated Earthquake entity
     */
    UpdateEarthquake: async (_, { id, latitude, longitude, magnitude, date }) => {
      await AppDataSource.initialize();
      const earthquakeRepository = AppDataSource.getRepository(Earthquake);
      const earthquake = await earthquakeRepository.findOneBy({ id });
      if (!earthquake) {
        await AppDataSource.destroy();
        throw new Error('Earthquake not found');
      }

      if (latitude !== undefined) earthquake.latitude = latitude;
      if (longitude !== undefined) earthquake.longitude = longitude;
      if (magnitude !== undefined) earthquake.magnitude = magnitude;
      if (date !== undefined) earthquake.date = new Date(date);

      const updatedEarthquake = await earthquakeRepository.save(earthquake);
      await AppDataSource.destroy();
      return updatedEarthquake;
    },

    /**
     * Deletes an existing earthquake record from the database.
     *
     * @param {Object} _ - unused parameter, required by GraphQL
     * @param {number} id - the ID of the earthquake to delete
     * @returns {Promise<boolean>} - a promise that resolves to true if the earthquake was successfully deleted
     */
    DeleteEarthquake: async (_, { id }) => {
      await AppDataSource.initialize();
      const earthquakeRepository = AppDataSource.getRepository(Earthquake);
      const earthquake = await earthquakeRepository.findOneBy({ id });
      if (!earthquake) {
        await AppDataSource.destroy();
        throw new Error('Earthquake not found');
      }

      await earthquakeRepository.remove(earthquake);
      await AppDataSource.destroy();
      return true;
    }
  }
};

module.exports = { resolvers };
