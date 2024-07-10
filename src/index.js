/**
 * Entry point for the Earthquake API server.
 * Sets up the Express application, Apollo Server, and database connection.
 */

require('reflect-metadata');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { DataSource } = require('typeorm');
const { typeDefs } = require('./schema/schema.js');
const { resolvers } = require('./resolver/earthquakeResolver.js');
const config = require('./ormconfig.js');

const AppDataSource = new DataSource(config);

/**
 * Start the server.
 * Creates the database connection and sets up the Apollo Server with the Express app.
 */
const startServer = async () => {
  await AppDataSource.initialize();

  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
