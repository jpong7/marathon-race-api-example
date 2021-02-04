const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RaceSchema = new Schema({
  title: {
    type: String,
    required: true
  }
})

module.exports = Race = mongoose.model('races', RaceSchema)