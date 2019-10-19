const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
  picture: String,
  imgs: Array,
  md_content: String,
  html_content: String,
  istop: Boolean,
  date: String,
  pageviews: Number
})
module.exports = mongoose.model('Article', schema)