const graphql = require("graphql");
const _ = require("lodash");

const characterModel = require("../models/character");
const planetModel = require("../models/planet");

// Define the SCHEMA to pass as a parameter at the graphqlHTTP function
// this will describe the data on this kind of graph
// describe the object types and the relation between this object types
// how to query, receive, mutate and change the data

// Grab some properties from graphql as tools
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull // Add required fields within the mutations
} = graphql;

const CharacterType = new GraphQLObjectType({
  name: "Character",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    job: { type: GraphQLString },
    planet: {
      type: PlanetType,
      resolve(parent, args) {
        return planetModel.findById(parent.planetId);
      }
    }
  })
});

const PlanetType = new GraphQLObjectType({
  name: "Planet",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    characters: {
      type: new GraphQLList(CharacterType),
      resolve(parent, args) {
        return characterModel.find({ planetId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLID } }, // args allow us to pass data to resolve function
      resolve(parent, args) {
        return characterModel.findById(args.id);
      }
    },
    planet: {
      type: PlanetType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return planetModel.findById(args.id);
      }
    },
    characters: {
      type: new GraphQLList(CharacterType),
      resolve(parent, args) {
        return characterModel.find();
      }
    },
    planets: {
      type: new GraphQLList(PlanetType),
      resolve(parent, args) {
        return planetModel.find();
      }
    }
  }
});

// What are mutations?
// Is what allow us mutate or change our data: adding data, deleting data...
// We must explicitly declare what data could be added, deleted, updated...
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPlanet: {
      type: PlanetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let planet = new planetModel({
          name: args.name,
          age: args.age
        });
        return planet.save();
      }
    },
    addCharacter: {
      type: CharacterType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        job: { type: new GraphQLNonNull(GraphQLString) },
        planetId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let character = new characterModel({
          name: args.name,
          job: args.job,
          planetId: args.planetId
        });
        return character.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
