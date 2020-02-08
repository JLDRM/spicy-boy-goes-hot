const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

var dummyData = [
  { id: "1", name: "Ricky", genre: "Bitch" },
  { id: "2", name: "Morty", genre: "Bitch" },
  { id: "3", name: "Scary Terry", genre: "Bitch" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, // args allow us to query for a particular book
      resolve(parent, args) {
        return _.find(dummyData, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
