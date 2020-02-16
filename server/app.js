const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  "mongodb+srv://Crocubot:DontBeRude@spicy-boy-stays-hot-bquzt.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("...connected to the database");
});

// Middleware to handle graphql calls
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(6767, () => {
  console.log("...listening on port 6767...that burns");
});
