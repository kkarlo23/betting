const mongoose = require('mongoose')

const SportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = SportSchema
