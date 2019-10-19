module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useFindAndModify: false,
  }).catch(err => {
    console.log(err)
  }).then(console.log("数据库连接成功"))
}