module.exports = app => {
  const express = require('express')
  const Tag = require('../models/Tag')
  const AdminUser = require('../models/AdminUser')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const router = express.Router({
    mergeParams: true
  })
  const page_size = 10; // 每页文章数量
  //常规获取
  router.get('/', async (req, res) => {
    const items = await req.Model.find()
    res.send(items)
  })
  //获取文章数量
  router.get('/all/count', async (req, res) => {
    const cnt = await req.Model.countDocuments()
    res.send(cnt.toString())
  })
  // 后端列表
  router.get('/all/list/:current_page', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = {
        path: 'tags',
        select: 'tag'
      }
    }
    // 查询置顶文章
    const top = await req.Model.find({
      istop: true
    }, {
      html_content: 0,
      md_content: 0,
      imgs: 0
    })
    .setOptions(queryOptions).sort({
      '_id': -1
    })
    // 判断是否为第一页
    if (req.params.current_page === "1") {
      var items = await req.Model.find({
        istop: false
      }, {
        html_content: 0,
        md_content: 0,
        imgs: 0
      })
      .limit(page_size-top.length)
      .setOptions(queryOptions).sort({
        '_id': -1
      })
      items = top.concat(items)
    } else {
      var items = await req.Model.find({
        istop: false
      }, {
        html_content: 0,
        md_content: 0,
        imgs: 0
      })
      .skip((req.params.current_page - 2) * page_size + (page_size - top.length)).limit(page_size)
      .setOptions(queryOptions).sort({
        '_id': -1
      })
    }
    res.send(items)
  })
  // 通过标签查询文章的数量
  router.get('/search_tag/:search_tag/count', async (req, res) => {
    const tag = await Tag.findOne({
      'tag': req.params.search_tag
    })
    const cnt = await req.Model.find({
      tags: {
        $in: [tag._id]
      }
    }).countDocuments()
    res.send(cnt.toString())
  })
  // 通过标签查询文章
  router.get('/search_tag/:search_tag/list/:current_page', async (req, res) => {
    const tag = await Tag.findOne({
      'tag': req.params.search_tag
    })
    const items = await req.Model.find({
        tags: {
          $in: [tag._id]
        }
      }, {
        html_content: 0,
        md_content: 0
      })
      .skip((req.params.current_page - 1) * page_size).limit(page_size)
      .populate({
        path: 'tags',
        select: 'tag'
      })
      .sort({
        '_id': -1
      })
    res.send(items)
  })
  // 通过搜索查询文章的数量
  router.get('/search/:search/count', async (req, res) => {
    const cnt = await req.Model.find({
      // 多重查询，通过regex查询title，md_content字段
      $or: [{
          title: {
            $regex: req.params.search,
            $options: "$i"
          }
        },
        {
          md_content: {
            $regex: req.params.search,
            $options: "$i"
          }
        }
      ]
    }).countDocuments()
    res.send(cnt.toString())
  })
  // 通过搜索查询文章
  router.get('/search/:search/list/:current_page', async (req, res) => {
    const items = await req.Model.find(({
        // 多重查询，通过regex查询title，md_content字段
        $or: [{
            title: {
              $regex: req.params.search,
              $options: "$i"
            }
          },
          {
            md_content: {
              $regex: req.params.search,
              $options: "$i"
            }
          }
        ]
      }), {
        html_content: 0,
        md_content: 0
      })
      .skip((req.params.current_page - 1) * page_size).limit(page_size)
      .populate({
        path: 'tags',
        select: 'tag'
      })
      .sort({
        '_id': -1
      })
    res.send(items)
  })
  // get单个
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 新建
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // upload文章图片
  router.post('/aritcle-img', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // upload卡片图片
  router.post('/card-img', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 登录校验中间件
  const authMiddleware = require('../middleware/auth')
  // 常规资源中间件
  const commonMiddleware = require('../middleware/common')
  app.use('/api/admin/common/:resource', authMiddleware(), commonMiddleware(), router) // 主要挂载

  // 引入上传插件multer
  const multer = require('multer')
  // 上传卡片图片
  const card_img = multer({dest: __dirname + '/../uploads/card_img'})
  app.post('/api/upload/card_img', authMiddleware(), card_img.single('file'), async(req, res) => {
    const file = req.file
    file.url = `https://yanhe.site/uploads/card_img/${file.filename}`
    res.send(file)
  })
  // 上传文章图片
  const article_img = multer({dest: __dirname + '/../uploads/article_img'})
  app.post('/api/upload/article_img', authMiddleware(), article_img.single('image'), async(req, res) => {
    const file = req.file
    file.url = `https://yanhe.site/uploads/article_img/${file.filename}`
    res.send(file)
  })
  // 删除上传卡片图片
  app.delete('/api/upload/del/card_img/:img_url', authMiddleware(), async(req, res) => {
    const fs = require('fs')
    await fs.unlinkSync(__dirname + '/../uploads/card_img/' + req.params.img_url, (err) => {
      if(err) throw err;
    })
    res.send({
      success: true
    })
  })
  // 删除上传文章图片
  app.delete('/api/upload/del/article_img/:img_url', authMiddleware(), async(req, res) => {
    const fs = require('fs')
    await fs.unlinkSync(__dirname + '/../uploads/article_img/' + req.params.img_url, (err) => {
      if(err) throw err;
    })
    res.send({
      success: true
    })

  })
  // 登录
  app.post('/api/login', async(req, res) => {
    const { name, password } = req.body
    // 1.根据用户名找到用户
    const user = await AdminUser.findOne({ name }).select('+password')
    assert(user, 422, '管理员不存在')
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token  
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })

  // 错误处理函数
  app.use( async(err, req, res, next) => {  
    res.status(err.status || 500).send({
      message: err.message
    })
  })
}