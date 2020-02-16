const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planetSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model("Planet", planetSchema);
