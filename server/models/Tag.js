const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  tag: String
})

module.exports = mongoose.model('Tag', schema)