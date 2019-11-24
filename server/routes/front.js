module.exports = app => {
  const express = require('express')
  const Tag = require('../models/Tag')
  const router = express.Router({
    mergeParams: true
  })
  const page_size = 12; // 每页文章数量
  //常规获取
  router.get('/', async (req, res) => {
    const items = await req.Model.find()
    res.send(items)
  })
  //获取文章数量
  router.get('/count', async (req, res) => {
    const cnt = await req.Model.countDocuments()
    res.send(cnt.toString())
  })
  // 前端列表 置顶功能
  router.get('/list/:current_page', async (req, res) => {
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
        .limit(page_size - top.length)
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
    const model = await req.Model.findById(req.params.id).populate({
      path: 'tags',
      select: 'tag'
    })
    res.send(model)
  })
  // 获取页面文章
  router.get('/page/:name', async (req, res) => {
    const model = await req.Model.findOne({
      'name': req.params.name
    })
    res.send(model)
  })
  // 阅读量自加
  router.put('/pageviews/:id', async (req, res) => {
    await req.Model.findByIdAndUpdate(req.params.id, {
      $inc: {
        pageviews: 1
      }
    })
    res.send({
      success: true
    })
  })
  // 常规资源中间件
  const commonMiddleware = require('../middleware/common')
  app.use('/api/front/common/:resource', commonMiddleware(), router)
}