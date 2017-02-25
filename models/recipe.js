const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema({
  name: {type: String},
  ingredients: {type: Array},
  directions: {type: Array}
});

module.exports = mongoose.model('Recipe', Recipe);