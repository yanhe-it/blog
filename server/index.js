const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
// app.get('*', (req, res) => {
//     const app = new Vue({
//         data: {
//             url: req.url
//         },
//         template: `<div>访问的 URL 是： {{ url }}</div>`
//     })

//     renderer.renderToString(app, (err, html) => {
//         if (err) {
//             res.status(500).end('Internal Server Error')
//             return
//         }
//         console.log(html) // html 将是注入应用程序内容的完整页面
//     })
// })
app.set('secret', 'kljdfsjjf')

app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}))
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