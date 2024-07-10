/**
 * This script loads initial data from a CSV file into the database.
 * It reads the data from the CSV file located in the `data` directory,
 * parses it, and saves it to the Earthquake repository in the SQLite database.
 */

const { DataSource } = require('typeorm');
const Earthquake = require('../entity/Earthquake.js');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const config = require('../ormconfig.js');

const AppDataSource = new DataSource(config);

/**
 * Loads initial earthquake data from a CSV file into the database.
 * This function initializes the data source, reads data from a CSV file,
 * parses it, and saves it to the Earthquake repository in the SQLite database.
 */
const loadInitialData = async () => {
  /**
   * Initialize the data source (i.e., establish a connection to the database).
   */
  await AppDataSource.initialize();
  const earthquakeRepository = AppDataSource.getRepository(Earthquake);

  const filePath = path.join(__dirname, '../../data/earthquakes.csv');
  const results = [];

  /**
   * Read the CSV file, parse it, and process each row of data.
   */
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', data => {
      results.push({
        latitude: parseFloat(data.Latitude),
        longitude: parseFloat(data.Longitude),
        magnitude: parseFloat(data.Magnitude),
        date: new Date(data.Date)
      });
    })
    .on('end', async () => {
      await earthquakeRepository.save(results);
      console.log('Initial data loaded');
      await AppDataSource.destroy();
    });
};

loadInitialData();
