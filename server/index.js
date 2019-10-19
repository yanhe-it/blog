const express = require('express')
const app = express()

app.set('secret', 'kljdfsjjf')
app.use(require('cors')())
app.use(express.json())
// 托管上传图片
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/', express.static(__dirname + '/client'))
//引入数据库和路由
require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/front')(app)

app.listen(3000, () => console.log("https://yanhe.site"))