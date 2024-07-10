/**
 * GraphQL schema definition for the Earthquake API.
 * Defines the types, queries, and mutations for interacting with Earthquake data.
 */

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Earthquake {
    id: ID!
    latitude: Float!
    longitude: Float!
    magnitude: Float!
    date: String!
  }

  type Query {
    GetEarthquakes: [Earthquake]
  }

  type Mutation {
    CreateEarthquake(latitude: Float!, longitude: Float!, magnitude: Float!, date: String!): Earthquake
    UpdateEarthquake(id: ID!, latitude: Float, longitude: Float, magnitude: Float, date: String): Earthquake
    DeleteEarthquake(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
