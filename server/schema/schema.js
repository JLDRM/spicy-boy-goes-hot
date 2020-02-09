const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

var dummyCharacters = [
  { id: "1", name: "Ricky", job: "Terrorist", planetId: "1" },
  { id: "2", name: "Morty", job: "Terrorist Assistant", planetId: "1" },
  { id: "3", name: "Raptor Photographer", job: "Photographer", planetId: "3" },
  { id: "4", name: "Reverse Giraffe", job: "Comediant", planetId: "3" },
  { id: "5", name: "Scary Terry", job: "Bitch", planetId: "2" }
];

var dummyPlanets = [
  { name: "Earth", age: 96, id: "1" },
  { name: "Putonium", age: 45, id: "2" },
  { name: "Mars", age: 78, id: "3" }
];

const CharacterType = new GraphQLObjectType({
  name: "Character",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    job: { type: GraphQLString },
    planet: {
      type: PlanetType,
      resolve(parent, args) {
        return _.find(dummyPlanets, { id: parent.planetId });
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
        return _.filter(dummyCharacters, { planetId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLID } }, // args allow us to query for a particular book
      resolve(parent, args) {
        return _.find(dummyData, { id: args.id });
      }
    },
    planet: {
      type: PlanetType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(dummyPlanets, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
