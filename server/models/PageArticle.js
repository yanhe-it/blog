const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  imgs: Array,
  md_content: String,
  html_content: String,
  date: String
})

module.exports = mongoose.model('PageArticle', schema)