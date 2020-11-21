const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

const mongo_connection = process.env['MONGO_CONNECTION'];

const corsOptions = { origin: "http://localhost:3000" };

mongoose.connect(
  mongo_connection,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("...connected to the database");
});

// Middleware to handle graphql calls
app.use(
  "/graphql",
  cors(corsOptions),
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(6767, () => {
  console.log("...listening on port 6767...that burns");
});
